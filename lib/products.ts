interface UserProfile {
  level: string;
  sports: string[];
  objectives: string[];
  injuries: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  relevance: string;
  icon: string;
  rating: number;
  link?: string;
}

const PRODUCTS_DB: Product[] = [
  {
    id: "1",
    name: "Tapis de Yoga Premium",
    category: "Yoga & Flexibilité",
    price: "39,99€",
    image: "/products/yoga-mat.jpg",
    relevance: "9",
    icon: "🟪",
    rating: 4.8,
    link: "https://www.decathlon.tn/p/360462-120176-tapis-de-yoga-debutant-adherence-et-confort-5mm-bleu-fonce.html",
  },
  {
    id: "2",
    name: "Haltères Réglables 5-15kg",
    category: "Force",
    price: "99,99€",
    image: "/products/dumbbells.jpg",
    relevance: "8",
    icon: "🏋️",
    rating: 4.7,
    link: "https://www.decathlon.tn/p/130443-28409-paire-d-halteres-fitness-25-kg-fonte-a-80-recyclee-noir.html",
  },
  {
    id: "3",
    name: "Bande de Résistance Set",
    category: "Force",
    price: "24,99€",
    image: "/products/resistance.jpg",
    relevance: "8",
    icon: "🟠",
    rating: 4.6,
    link: "https://www.decathlon.tn/p/187033-3383-elastique-de-musculation-training-band-35-kg-orange.html",
  },
  {
    id: "4",
    name: "Tapis de Sol Épais",
    category: "Core",
    price: "29,99€",
    image: "/products/floor-mat.jpg",
    relevance: "9",
    icon: "⬜",
    rating: 4.7,
    link: "https://www.decathlon.fr/p/tapis-de-pilates-confort-epaisseur-15-mm-vert-clair/_/R-p-351006",
  },
  {
    id: "5",
    name: "Balle de Stabilité 65cm",
    category: "Core & Balance",
    price: "34,99€",
    image: "/products/stability-ball.jpg",
    relevance: "7",
    icon: "🟡",
    rating: 4.5,
    link: "https://www.decathlon.fr/p/gym-ball-taille-2-resistant-65-cm-bleu/_/R-p-328543",
  },
  {
    id: "6",
    name: "Rouleau de Massage Haute Densité",
    category: "Récupération",
    price: "44,99€",
    image: "/products/foam-roller.jpg",
    relevance: "8",
    icon: "🔘",
    rating: 4.8,
    link: "https://www.decathlon.fr/p/rouleau-de-massage-tendre-foam-roller-bleu/_/R-p-328766",
  },
  {
    id: "7",
    name: "Vêtement Compression - Legging",
    category: "Vêtements",
    price: "69,99€",
    image: "/products/compression.jpg",
    relevance: "7",
    icon: "👖",
    rating: 4.6,
    link: "https://www.decathlon.fr/p/mp/2xu/core-compression-tights-legging-de-sport/_/R-p-48cb0ba6-496c-4c02-b6ad-267012310415",
  },
  {
    id: "8",
    name: "Ceinture Lombaire Support",
    category: "Support",
    price: "49,99€",
    image: "/products/lumbar-support.jpg",
    relevance: "8",
    icon: "🎽",
    rating: 4.7,
    link: "https://www.decathlon.tn/p/360592-111606-ceinture-lombaire-de-musculation-en-cuir-resistante-noire.html",
  },
];

export function getProductRecommendations(profile: UserProfile): Product[] {
  const recommended: Product[] = [];

  // Recommandations basées sur les sports
  if (profile.sports.includes("yoga")) {
    recommended.push(PRODUCTS_DB[0]); // Tapis Yoga
  }

  if (
    profile.sports.includes("fitness") ||
    profile.sports.includes("running")
  ) {
    recommended.push(PRODUCTS_DB[1]); // Haltères
    recommended.push(PRODUCTS_DB[2]); // Bandes
    recommended.push(PRODUCTS_DB[3]); // Tapis Sol
  }

  // Recommandations basées sur les objectifs
  if (profile.objectives.includes("strength")) {
    recommended.push(PRODUCTS_DB[1], PRODUCTS_DB[2]);
  }

  if (profile.objectives.includes("flexibility")) {
    recommended.push(PRODUCTS_DB[0], PRODUCTS_DB[5]);
  }

  if (profile.objectives.includes("recovery")) {
    recommended.push(PRODUCTS_DB[5], PRODUCTS_DB[6]);
  }

  // Recommandations basées sur les blessures
  if (profile.injuries.includes("back_pain")) {
    recommended.push(PRODUCTS_DB[7]); // Ceinture Lombaire
  }

  if (profile.injuries.includes("shoulder")) {
    recommended.push(PRODUCTS_DB[5]); // Rouleau
  }

  // Assurer une variété, limiter les doublons
  const unique = Array.from(
    new Map(
      recommended.concat(PRODUCTS_DB.slice(3, 6)).map((p) => [p.id, p])
    ).values()
  );

  return unique.slice(0, 8);
}
