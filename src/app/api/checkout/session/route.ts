import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CheckoutInputSchema } from "@/lib/schemas";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/shipping";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CheckoutInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, items, shippingAddress } = parsed.data;

    // Database transaction to check stock and decrement atomically (Section 4 & 5 rule)
    const result = await prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const orderItemsToCreate = [];

      for (const item of items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
          include: { product: true },
        });

        if (!variant) {
          throw new Error(`Item variant ${item.variantId.slice(0,6)}... is no longer available in the archive. Please clear your cart and try again.`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(
            `Sorry, "${variant.product.name}" (${variant.size}) just sold out or does not have enough stock.`
          );
        }

        // Decrement stock
        await tx.productVariant.update({
          where: { id: variant.id },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        const linePrice = variant.product.price;
        subtotal += linePrice * item.quantity;

        orderItemsToCreate.push({
          productId: variant.productId,
          variantId: variant.id,
          productNameSnapshot: variant.product.name,
          priceSnapshot: linePrice,
          quantity: item.quantity,
          sizeSnapshot: variant.size,
        });
      }

      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      const total = subtotal + shipping;

      const order = await tx.order.create({
        data: {
          email,
          status: "PAID",
          subtotal,
          total,
          shippingAddress: JSON.stringify(shippingAddress),
          items: {
            create: orderItemsToCreate,
          },
        },
      });

      return order;
    });

    return NextResponse.json({ ok: true, orderId: result.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
