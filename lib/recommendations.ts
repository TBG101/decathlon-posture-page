import { enrichMovement } from "./exercise-api"

interface UserProfile {
  level: string
  sports: string[]
  objectives: string[]
  injuries: string[]
}

interface Movement {
  id: string
  title: string
  description: string
  icon: string
  difficulty: string
  duration: string
  tags: string[]
  instructions: string[]
  warnings: string
  imageUrl?: string
}

const MOVEMENTS_DB: Record<string, Movement> = {
  squat: {
    id: "squat",
    title: "Squat - Fondamentaux",
    description: "Mouvement de base pour renforcer les jambes et le core",
    icon: "🦵",
    difficulty: "Facile",
    duration: "3-5 min",
    tags: ["Force", "Jambes", "Core"],
    instructions: [
      "Pieds écartés à la largeur des épaules",
      "Regardez droit devant vous, gardez le dos droit",
      "Fléchissez les genoux et descendez les hanches comme si vous vous asseoyez",
      "Descendez jusqu'à ce que les cuisses soient parallèles au sol",
      "Poussez par les talons pour revenir à la position de départ",
      "Effectuez 3 séries de 10-15 répétitions",
    ],
    warnings: "Les genoux ne doivent pas dépasser les orteils. En cas de douleur lombaire, réduisez l'amplitude.",
  },
  pushup: {
    id: "pushup",
    title: "Pompe - Variante Classique",
    description: "Renforcement du buste, bras et core",
    icon: "💪",
    difficulty: "Intermédiaire",
    duration: "5-10 min",
    tags: ["Force", "Buste", "Bras"],
    instructions: [
      "Allongez-vous face au sol, mains à la largeur des épaules",
      "Corps tendu, formant une ligne droite de la tête aux talons",
      "Descendez en fléchissant les coudes jusqu'à quelques cm du sol",
      "Repoussez-vous vers le haut en étendant les bras",
      "Variante facile: genoux au sol",
      "Effectuez 3 séries de 5-10 répétitions",
    ],
    warnings:
      "Gardez le core contracté. Ne laissez pas les hanches s'affaisser. En cas de douleur d'épaule, réduisez l'amplitude.",
  },
  plank: {
    id: "plank",
    title: "Planche - Core Fundamental",
    description: "Isométrique pour un core stable et fort",
    icon: "📏",
    difficulty: "Facile",
    duration: "5-10 min",
    tags: ["Core", "Stabilité", "Endurance"],
    instructions: [
      "Position face au sol, avant-bras parallèles",
      "Coudes alignés sous les épaules",
      "Corps tendu en ligne droite",
      "Contractez les abdominaux et les fessiers",
      "Tenez 20-60 secondes",
      "Reposez-vous 30 secondes et répétez 3 fois",
    ],
    warnings:
      "Ne laissez pas les hanches s'affaisser. Respirez régulièrement. En cas de douleur au cou, regardez légèrement vers l'avant.",
  },
  yoga_downward_dog: {
    id: "yoga_downward_dog",
    title: "Chien Tête en Bas - Flexibilité",
    description: "Étirement et renforcement simultanés",
    icon: "🐕",
    difficulty: "Facile",
    duration: "2-3 min",
    tags: ["Flexibilité", "Étirement", "Yoga"],
    instructions: [
      "Commencez à quatre pattes",
      "Mains à la largeur des épaules, genoux à la largeur des hanches",
      "Relevez les hanches vers le plafond",
      "Formez un triangle avec le corps",
      "Appuyez fermement avec les mains",
      "Tenez 30-60 secondes",
    ],
    warnings:
      "Évitez si vous avez une pression artérielle élevée. Les poignets sensibles peuvent utiliser des modifications.",
  },
  lunges: {
    id: "lunges",
    title: "Fente - Stabilité et Force",
    description: "Mouvement unilatéral pour l'équilibre et la force",
    icon: "🚶",
    difficulty: "Intermédiaire",
    duration: "5-7 min",
    tags: ["Force", "Équilibre", "Jambes"],
    instructions: [
      "Debout, pieds écartés à la largeur des hanches",
      "Avancez une jambe et fléchissez les deux genoux",
      "Descendez jusqu'à ce que la jambe arrière presque touche le sol",
      "Le genou avant ne doit pas dépasser l'orteil",
      "Poussez vers l'avant pour revenir",
      "Alternez les jambes - 3 séries de 10 par jambe",
    ],
    warnings:
      "Gardez le torse droit. En cas de problème de genou, réduisez l'amplitude. Utile pour la prévention de déséquilibre musculaire.",
  },
  shoulder_mobility: {
    id: "shoulder_mobility",
    title: "Mobilité de l'Épaule",
    description: "Prévention des problèmes d'épaule et amélioration de la mobilité",
    icon: "⭕",
    difficulty: "Facile",
    duration: "3-5 min",
    tags: ["Mobilité", "Épaule", "Flexibilité"],
    instructions: [
      "Bras tendu vers l'avant à la hauteur de l'épaule",
      "Effectuez des rotations circulaires vers l'avant (10x)",
      "Puis effectuez des rotations vers l'arrière (10x)",
      "Augmentez progressivement l'amplitude",
      "Répétez avec les deux bras",
      "Répétez la séquence 2-3 fois",
    ],
    warnings: "Faites des mouvements lents et contrôlés. En cas de douleur d'épaule existante, soyez très prudent.",
  },
}

export async function getRecommendationsWithImages(profile: UserProfile) {
  const baseRecommendations = getRecommendations(profile)

  // Enrich movements with external data
  const enrichedMovements = await Promise.all(
    baseRecommendations.movements.map((movement) => enrichMovement(movement, movement.id)),
  )

  return {
    movements: enrichedMovements,
  }
}

// Keep original function for backward compatibility
export function getRecommendations(profile: UserProfile) {
  const selectedMovements: Movement[] = []

  // Sélection basée sur le profil
  if (profile.sports.includes("fitness") || profile.sports.includes("running")) {
    selectedMovements.push(MOVEMENTS_DB.squat)
    selectedMovements.push(MOVEMENTS_DB.lunges)
  }

  if (profile.sports.includes("fitness")) {
    selectedMovements.push(MOVEMENTS_DB.pushup)
    selectedMovements.push(MOVEMENTS_DB.plank)
  }

  if (profile.sports.includes("yoga")) {
    selectedMovements.push(MOVEMENTS_DB.yoga_downward_dog)
  }

  if (profile.injuries.includes("back_pain") || profile.objectives.includes("recovery")) {
    selectedMovements.push(MOVEMENTS_DB.plank)
    selectedMovements.push(MOVEMENTS_DB.yoga_downward_dog)
  }

  if (profile.injuries.includes("shoulder") || profile.sports.includes("swimming")) {
    selectedMovements.push(MOVEMENTS_DB.shoulder_mobility)
  }

  // Assurer une variété minimale
  if (selectedMovements.length === 0) {
    selectedMovements.push(MOVEMENTS_DB.squat)
    selectedMovements.push(MOVEMENTS_DB.plank)
    selectedMovements.push(MOVEMENTS_DB.yoga_downward_dog)
  }

  return {
    movements: selectedMovements.slice(0, 6),
  }
}
