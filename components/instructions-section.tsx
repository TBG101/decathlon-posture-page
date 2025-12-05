"use client"

import { useState, useEffect } from "react"
import MovementCard from "@/components/movement-card"
import { getRecommendations } from "@/lib/recommendations"

interface UserProfile {
  level: string
  sports: string[]
  objectives: string[]
  injuries: string[]
}

export default function InstructionsSection({ profile }: { profile: UserProfile }) {
  const recommendations = getRecommendations(profile)
  const [selectedMovement, setSelectedMovement] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Record<string, string | null>>({})
  const [isLoadingImage, setIsLoadingImage] = useState(false)

  const movement = recommendations.movements[selectedMovement]

  useEffect(() => {
    if (!movement || loadedImages.hasOwnProperty(movement.id)) {
      return
    }

    setIsLoadingImage(true)
    fetch(`/api/exercises?id=${encodeURIComponent(movement.id)}`)
      .then((res) => res.json())
      .then((data) => {
        setLoadedImages((prev) => ({
          ...prev,
          [movement.id]: data.imageUrl || null,
        }))
        console.log("[v0] Loaded image for", movement.id, ":", data.imageUrl)
      })
      .catch((err) => {
        console.error("[v0] Error loading exercise image:", err)
        setLoadedImages((prev) => ({
          ...prev,
          [movement.id]: null,
        }))
      })
      .finally(() => setIsLoadingImage(false))
  }, [movement, loadedImages])

  const currentImageUrl = movement ? loadedImages[movement.id] : null

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">📚 Niveau 2 & 3: Instructions Personnalisées</h3>
        <p className="text-gray-600">Mouvements recommandés avec instructions et illustrations visuelles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.movements.map((mov, index) => (
          <button
            key={mov.id}
            onClick={() => setSelectedMovement(index)}
            className={`text-left transition-all ${selectedMovement === index ? "ring-2 ring-decathlon-blue" : ""}`}
          >
            <MovementCard movement={mov} isSelected={selectedMovement === index} />
          </button>
        ))}
      </div>

      {movement && (
        <div className="bg-white rounded-2xl p-8 border border-blue-100">
          <div className="mb-6">
            <h4 className="text-3xl font-bold text-gray-900 mb-2">{movement.title}</h4>
            <p className="text-gray-600 mb-4">{movement.description}</p>
            <div className="flex gap-2 flex-wrap mb-6">
              {movement.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-decathlon-blue text-sm font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl h-80 flex items-center justify-center mb-8 overflow-hidden">
            {isLoadingImage ? (
              <div className="text-center">
                <div className="animate-spin text-4xl mb-2">⏳</div>
                <p className="text-gray-600 font-medium">Chargement illustration...</p>
              </div>
            ) : currentImageUrl ? (
              <img
                src={currentImageUrl || "/placeholder.svg"}
                alt={movement.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("[v0] Image failed to load:", currentImageUrl)
                  e.currentTarget.style.display = "none"
                }}
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">{movement.icon}</div>
                <p className="text-gray-600 font-medium">Illustration de posture correcte</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-lg text-gray-900">📋 Instructions Détaillées:</h5>
            <ol className="space-y-3 list-decimal list-inside">
              {movement.instructions.map((instruction, i) => (
                <li key={i} className="text-gray-700 leading-relaxed">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>⚠️ Points d'Attention:</strong> {movement.warnings}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
