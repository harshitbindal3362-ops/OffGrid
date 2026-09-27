/**
 * Seed script: clears all existing products and adds the 5 new OFFGRID products.
 * Run with: npx tsx prisma/seed-products.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Clearing existing products...");
  // Delete in dependency order
  await prisma.wishlistItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  console.log("✅ Cleared all products.");

  const products = [
    {
      name: "Saint Tears ZNA 026 Long Sleeve — Olive",
      slug: "saint-tears-zna-026-olive",
      description:
        "Heavy drop. The Saint Tears ZNA 026 long-sleeve is constructed from a dense 380gsm cotton canvas in militaristic army olive. The oversized chest graphic references ZNA 026 archive iconography — saint figures, celestial stars, and flame-scorched sleeves printed directly into the fabric with a discharge wash for a broken-in finish. A statement relic from the CDR capsule.",
      price: 3499,
      compareAtPrice: 4999,
      condition: "NEW",
      category: "TEES",
      status: "PUBLISHED",
      isOneOfOne: false,
      tag: "CDR CAPSULE",
      images: [{ url: "/products/saint-tears-olive.jpg", altText: "Saint Tears ZNA 026 Long Sleeve in Olive" }],
      variants: [
        { size: "S", stock: 5 },
        { size: "M", stock: 8 },
        { size: "L", stock: 6 },
        { size: "XL", stock: 4 },
      ],
    },
    {
      name: "Saint Tears AZNA 2026 Long Sleeve — Sand",
      slug: "saint-tears-azna-2026-sand",
      description:
        "Warm sand colourway. The AZNA 2026 edition of the Saint Tears long-sleeve features an oversized desert-themed graphic — camelback rider, palm-lined skyline, and the iconic Saint Tears star banner printed in navy and sky blue on a washed beige ground. CDR branded cuff sleeves complete the archival aesthetic. 380gsm boxy fit.",
      price: 3499,
      compareAtPrice: 4999,
      condition: "NEW",
      category: "TEES",
      status: "PUBLISHED",
      isOneOfOne: false,
      tag: "CDR CAPSULE",
      images: [{ url: "/products/saint-tears-sand.jpg", altText: "Saint Tears AZNA 2026 Long Sleeve in Sand" }],
      variants: [
        { size: "S", stock: 5 },
        { size: "M", stock: 7 },
        { size: "L", stock: 6 },
        { size: "XL", stock: 3 },
      ],
    },
    {
      name: "Intrepid Athletic Lifting Collection Long Sleeve — Tan/White",
      slug: "intrepid-athletic-tan-white",
      description:
        "Dual-tone construction meets gym-lore graphics. The Intrepid Athletic Lifting Collection long-sleeve pairs a warm tan body with contrast white extended sleeves, both panels printed with intricate tribal scrollwork and the signature Intrepid sword-and-thorns chest graphic. Built for the iron temple and the street alike. 350gsm, boxy silhouette.",
      price: 2999,
      compareAtPrice: 3999,
      condition: "NEW",
      category: "TEES",
      status: "PUBLISHED",
      isOneOfOne: false,
      tag: "LIFTING COLLECTION",
      images: [{ url: "/products/intrepid-tan.jpg", altText: "Intrepid Athletic Tan/White Long Sleeve" }],
      variants: [
        { size: "S", stock: 4 },
        { size: "M", stock: 9 },
        { size: "L", stock: 7 },
        { size: "XL", stock: 5 },
      ],
    },
    {
      name: "Intrepid Athletic Lifting Collection Long Sleeve — Black/Red",
      slug: "intrepid-athletic-black-red",
      description:
        "Dark colourway. The Intrepid Athletic Lifting Collection in washed black features blood-red extended sleeves with tribal sleeve-print and the distressed Intrepid chest emblem in tonal crimson ink. A high-impact graphic piece that blurs the line between gymwear and archive streetwear. 350gsm, oversized boxy cut with ribbed cuffs.",
      price: 2999,
      compareAtPrice: 3999,
      condition: "NEW",
      category: "TEES",
      status: "PUBLISHED",
      isOneOfOne: false,
      tag: "LIFTING COLLECTION",
      images: [{ url: "/products/intrepid-red.jpg", altText: "Intrepid Athletic Black/Red Long Sleeve" }],
      variants: [
        { size: "S", stock: 3 },
        { size: "M", stock: 8 },
        { size: "L", stock: 5 },
        { size: "XL", stock: 4 },
      ],
    },
    {
      name: "Hoodie Vintage Skull Long Sleeve — Sand",
      slug: "hoodie-vintage-skull-sand",
      description:
        "Archival memento mori. The Hoodie Vintage Skull long-sleeve is a textbook relic piece — worn sand canvas, a large-scale discharged skull graphic across the chest with 'HOODIE VINTAGE' arched lettering in teal, and delicate fleur-de-lis cross motifs embossed along both sleeves. Heavyweight 360gsm, double-stitched seams, boxy silhouette.",
      price: 3199,
      compareAtPrice: 4499,
      condition: "NEW",
      category: "TEES",
      status: "PUBLISHED",
      isOneOfOne: false,
      tag: "ARCHIVE DROP",
      images: [{ url: "/products/hoodie-vintage-skull.jpg", altText: "Hoodie Vintage Skull Long Sleeve in Sand" }],
      variants: [
        { size: "S", stock: 4 },
        { size: "M", stock: 6 },
        { size: "L", stock: 8 },
        { size: "XL", stock: 5 },
      ],
    },
  ];

  console.log("🌱 Seeding 5 products...");

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        condition: p.condition,
        category: p.category,
        status: p.status,
        isOneOfOne: p.isOneOfOne,
        tag: p.tag,
        images: {
          create: p.images.map((img, i) => ({
            url: img.url,
            altText: img.altText,
            sortOrder: i,
          })),
        },
        variants: {
          create: p.variants.map((v) => ({
            size: v.size,
            stock: v.stock,
          })),
        },
      },
    });
    console.log(`  ✅ Created: ${product.name}`);
  }

  console.log("\n🎉 Seed complete! 5 products added.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
