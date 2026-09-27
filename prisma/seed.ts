import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding high-fashion editorial OFFGRID catalog...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.user.deleteMany();

  // Admin & Demo Customer
  await prisma.user.create({
    data: {
      email: "admin@offgrid.in",
      name: "OFFGRID Studio",
      role: "ADMIN",
      passwordHash: "admin123",
    },
  });

  await prisma.user.create({
    data: {
      email: "collector@offgrid.in",
      name: "Arjun Mehta",
      role: "CUSTOMER",
    },
  });

  // Dynamic Site Settings
  const settings = [
    {
      key: "tickerText",
      value: "SPRING/SUMMER ARCHIVE DROP NOW LIVE · WORLDWIDE INSURED TRANSIT · ALL VINTAGE PIECES 1-OF-1 & AUTHENTICATED · FLAGSHIP SANCTUARY: HAUZ KHAS VILLAGE",
    },
    {
      key: "footerTickerText",
      value: "OFFGRID ARCHIVES · SINGULAR OBJECTS · MODERN UTILITY · HAUZ KHAS VILLAGE NEW DELHI · TIMELESS PROVENANCE",
    },
    {
      key: "heroBadge",
      value: "ARCHIVE COLLECTION 04 / EDITION 2026",
    },
    {
      key: "heroHeadline",
      value: "SINGULAR PROVENANCE. ARCHIVAL SILHOUETTES.",
    },
    {
      key: "heroSubhead",
      value: "A curated sanctuary of authenticated one-of-one vintage relics alongside custom-developed heavyweight brutalist staples. Conceived and archived in New Delhi.",
    },
    {
      key: "statPiecesRehomed",
      value: "14,200+",
    },
    {
      key: "statUniqueInventory",
      value: "100%",
    },
    {
      key: "statShippingTime",
      value: "24-48H",
    },
    {
      key: "storeAddress",
      value: "Sanctuary 14, Hauz Khas Village, New Delhi, 110016",
    },
    {
      key: "storeHours",
      value: "Tuesday — Sunday / 13:00 — 21:00 (Private Consultations By Appointment)",
    },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }

  // High-aesthetic product catalog with curated editorial photos
  const p1 = await prisma.product.create({
    data: {
      name: "1998 NIRVANA 'IN UTERO' TOUR TEE",
      slug: "1998-nirvana-in-utero-tour-tee",
      description: "Authentic 1998 European leg tour relic with genuine sun-faded ozone patina. Single-stitched hem, heavy drape cotton with authentic micro-distressing along collar ribs. Hand-verified archival grail.",
      condition: "THRIFTED",
      category: "TEES",
      isOneOfOne: true,
      tag: "ARCHIVE 1/1",
      price: 18500,
      compareAtPrice: 24000,
      status: "PUBLISHED",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 0,
            altText: "Nirvana 1998 Tour Relic Front",
          },
          {
            url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 1,
            altText: "Nirvana Tour Relic Texture Detail",
          },
        ],
      },
      variants: {
        create: [{ size: "BOXY L / ARCHIVE", stock: 1 }],
      },
    },
  });

  const p2 = await prisma.product.create({
    data: {
      name: "1994 RAW DENIM TYPE-III TRUCKER",
      slug: "1994-raw-denim-type-iii-trucker",
      description: "Japanese selvedge indigo trucker jacket with 30 years of organic whiskering and natural honeycomb honeycomb fading. Solid brass shanks with weathered patina. Single owner provenance.",
      condition: "THRIFTED",
      category: "OUTERWEAR",
      isOneOfOne: true,
      tag: "RARE GRAIL",
      price: 22000,
      compareAtPrice: 32000,
      status: "PUBLISHED",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 0,
            altText: "1994 Type-III Trucker Front",
          },
        ],
      },
      variants: {
        create: [{ size: "VINTAGE XL", stock: 1 }],
      },
    },
  });

  const p3 = await prisma.product.create({
    data: {
      name: "OFFGRID HEAVYWEIGHT ESSENTIAL HOODIE 500GSM",
      slug: "offgrid-heavyweight-hoodie-500gsm",
      description: "Milled from bespoke 500 GSM combed French loopback terry. Features an architectural seamless double hood, engineered drop shoulders, and reinforced cuff ribs. Designed and cut in New Delhi.",
      condition: "NEW",
      category: "OUTERWEAR",
      isOneOfOne: false,
      tag: "IN-HOUSE",
      price: 6499,
      compareAtPrice: null,
      status: "PUBLISHED",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 0,
            altText: "OFFGRID Heavyweight Hoodie",
          },
        ],
      },
      variants: {
        create: [
          { size: "S", stock: 12 },
          { size: "M", stock: 24 },
          { size: "L", stock: 30 },
          { size: "XL", stock: 18 },
        ],
      },
    },
  });

  const p4 = await prisma.product.create({
    data: {
      name: "BRUTALIST OVERSIZED GRAPHIC TEE 300GSM",
      slug: "brutalist-oversized-graphic-tee-300gsm",
      description: "Ultra-heavy 300 GSM combed jersey with micro-rib collar and dropped armholes. Features tonal high-density silkscreen graphics influenced by brutalist architectural blueprints.",
      condition: "NEW",
      category: "TEES",
      isOneOfOne: false,
      tag: "CORE BASICS",
      price: 3299,
      compareAtPrice: 4200,
      status: "PUBLISHED",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 0,
            altText: "Brutalist Oversized Graphic Tee",
          },
        ],
      },
      variants: {
        create: [
          { size: "S", stock: 8 },
          { size: "M", stock: 20 },
          { size: "L", stock: 25 },
          { size: "XL", stock: 15 },
        ],
      },
    },
  });

  const p5 = await prisma.product.create({
    data: {
      name: "TACTICAL CARGO PARACHUTE TROUSER",
      slug: "tactical-cargo-parachute-trouser",
      description: "Constructed from high-density Japanese ripstop nylon. Ergonomic articulation darts at knees, 8 concealed geometric storm pockets, and matte black Fidlock-compatible hardware.",
      condition: "NEW",
      category: "BOTTOMS",
      isOneOfOne: false,
      tag: "NEW UTILITY",
      price: 5499,
      compareAtPrice: 7200,
      status: "PUBLISHED",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 0,
            altText: "Tactical Cargo Parachute Trouser",
          },
        ],
      },
      variants: {
        create: [
          { size: "WAIST 30", stock: 10 },
          { size: "WAIST 32", stock: 16 },
          { size: "WAIST 34", stock: 8 },
        ],
      },
    },
  });

  const p6 = await prisma.product.create({
    data: {
      name: "1991 HAND-KNIT MOHAIR DECONSTRUCTED CARDIGAN",
      slug: "1991-hand-knit-mohair-deconstructed-cardigan",
      description: "Archival artisanal knit with long-hair mohair pile in muted ash and moss pigments. Hand-carved horn buttons and natural draped silhouette. Museum-grade vintage condition.",
      condition: "THRIFTED",
      category: "KNITWEAR",
      isOneOfOne: true,
      tag: "ARCHIVE 1/1",
      price: 16800,
      compareAtPrice: null,
      status: "PUBLISHED",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 0,
            altText: "1991 Hand-Knit Mohair Cardigan",
          },
        ],
      },
      variants: {
        create: [{ size: "OVERSIZED M/L", stock: 1 }],
      },
    },
  });

  const p7 = await prisma.product.create({
    data: {
      name: "PROTOTYPE 001 DISTRESSED LEATHER BOMBER",
      slug: "prototype-001-distressed-leather-bomber-sold-out",
      description: "Hand-buffed vegetable tanned Italian calfskin with raw zinc zipper teeth. Limited atelier edition of 12 numbered samples. Archive drop completely exhausted.",
      condition: "NEW",
      category: "OUTERWEAR",
      isOneOfOne: false,
      tag: "ARCHIVE VAULT",
      price: 28000,
      compareAtPrice: null,
      status: "PUBLISHED",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=1000&auto=format&fit=crop&q=85",
            sortOrder: 0,
            altText: "Distressed Leather Bomber",
          },
        ],
      },
      variants: {
        create: [
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 0 },
        ],
      },
    },
  });

  // Featured Collection
  await prisma.collection.create({
    data: {
      name: "home-picks",
      title: "CURATED ROTATION // DROP 04",
      items: JSON.stringify([p1.id, p2.id, p3.id, p4.id, p5.id, p6.id]),
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
