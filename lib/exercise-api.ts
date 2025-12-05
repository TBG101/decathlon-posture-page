// This service fetches real exercise data from MuscleWiki and enriches our recommendations

interface MuscleWikiExercise {
  id: string
  name: string
  target: string
  category: string
  equipment: string
  difficulty: string
  instructions: string[]
  images?: string[]
}

interface EnrichedMovement {
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

// Mapping between our exercise names and MuscleWiki target muscles
const EXERCISE_MAPPING: Record<string, { name: string; targetMuscle: string }> = {
  squat: { name: "squat", targetMuscle: "quadriceps" },
  pushup: { name: "push up", targetMuscle: "chest" },
  plank: { name: "plank", targetMuscle: "abs" },
  lunges: { name: "lunge", targetMuscle: "quadriceps" },
  yoga_downward_dog: { name: "downward dog", targetMuscle: "back" },
  shoulder_mobility: { name: "shoulder press", targetMuscle: "shoulders" },
}

// Cache to avoid repeated API calls
const exerciseCache: Map<string, string | null> = new Map()

export async function fetchExerciseImageUrl(exerciseId: string): Promise<string | null> {
  // Check cache first
  if (exerciseCache.has(exerciseId)) {
    return exerciseCache.get(exerciseId) || null
  }

  try {
    // Call our secure server route handler
    const response = await fetch(`/api/exercises?id=${encodeURIComponent(exerciseId)}`)

    if (!response.ok) {
      console.error(`Failed to fetch exercise from route: ${response.status}`)
      exerciseCache.set(exerciseId, null)
      return null
    }

    const data = await response.json()
    const imageUrl = data.imageUrl || null

    exerciseCache.set(exerciseId, imageUrl)
    return imageUrl
  } catch (error) {
    console.error("[v0] Exercise API error:", error)
    exerciseCache.set(exerciseId, null)
    return null
  }
}

export async function enrichMovement(localMovement: any, exerciseId: string): Promise<any> {
  const imageUrl = await fetchExerciseImageUrl(exerciseId)

  return {
    ...localMovement,
    imageUrl: imageUrl || undefined,
  }
}

export async function preloadExercises(exerciseIds: string[]) {
  for (const id of exerciseIds) {
    await fetchExerciseImageUrl(id)
  }
}
