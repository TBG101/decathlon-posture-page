import { type NextRequest, NextResponse } from "next/server"

const EXERCISES_DB_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
const GITHUB_IMG_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises"

const EXERCISE_MAPPING: Record<string, { searchName: string; targetMuscle: string }> = {
  squat: { searchName: "squat", targetMuscle: "quadriceps" },
  pushup: { searchName: "push", targetMuscle: "chest" },
  plank: { searchName: "plank", targetMuscle: "abs" },
  lunges: { searchName: "lunge", targetMuscle: "quadriceps" },
  yoga_downward_dog: { searchName: "downward", targetMuscle: "back" },
  shoulder_mobility: { searchName: "shoulder", targetMuscle: "shoulders" },
}

interface FreeExerciseDbExercise {
  id: string
  name: string
  primaryMuscles: string[]
  secondaryMuscles?: string[]
  equipment?: string
  level?: string
  instructions?: string[]
  images?: string[]
  [key: string]: any
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const exerciseId = searchParams.get("id")

  if (!exerciseId || !EXERCISE_MAPPING[exerciseId]) {
    return NextResponse.json({ error: "Invalid exercise ID" }, { status: 400 })
  }

  const mapping = EXERCISE_MAPPING[exerciseId]

  try {
    console.log("[v0] Fetching from free-exercise-db for target:", mapping.targetMuscle)

    const response = await fetch(EXERCISES_DB_URL)

    if (!response.ok) {
      console.error(`[v0] free-exercise-db fetch error: ${response.status}`)
      return NextResponse.json({ imageUrl: null })
    }

    const allExercises: FreeExerciseDbExercise[] = await response.json()
    console.log(`[v0] Total exercises loaded: ${allExercises.length}`)

    const filtered = allExercises.filter((ex) =>
      ex.primaryMuscles?.some((m) => m.toLowerCase().includes(mapping.targetMuscle.toLowerCase())),
    )

    console.log(`[v0] Filtered exercises for ${mapping.targetMuscle}: ${filtered.length}`)

    // Search for specific exercise name
    let exercise = filtered.find((ex) => ex.name.toLowerCase().includes(mapping.searchName.toLowerCase()))

    if (!exercise && filtered.length > 0) {
      console.log(`[v0] No exact match for ${mapping.searchName}, using first filtered exercise`)
      exercise = filtered[0]
    }

    if (!exercise) {
      console.log("[v0] No exercise found for target muscle")
      return NextResponse.json({ imageUrl: null })
    }

    console.log("[v0] Found exercise:", exercise.name)
    console.log("[v0] Exercise images:", exercise.images?.length || 0)

    const imageUrl = exercise.images?.[0] ? `${GITHUB_IMG_BASE}/${exercise.images[0]}` : null

    console.log("[v0] Built image URL:", imageUrl)

    return NextResponse.json({
      imageUrl,
      exerciseName: exercise.name,
      instructions: exercise.instructions,
      equipment: exercise.equipment,
      level: exercise.level,
    })
  } catch (error) {
    console.error("[v0] Error fetching exercises:", error)
    return NextResponse.json({ imageUrl: null })
  }
}
