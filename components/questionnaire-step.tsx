"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProgressIndicator from "@/components/progress-indicator"

const QUESTIONS = [
  {
    id: "level",
    category: "Niveau Sportif",
    question: "Quel est votre niveau sportif ?",
    type: "single",
    options: [
      { value: "beginner", label: "Débutant", icon: "🌱" },
      { value: "intermediate", label: "Intermédiaire", icon: "💪" },
      { value: "advanced", label: "Avancé", icon: "🏆" },
    ],
  },
  {
    id: "sports",
    category: "Activités Sportives",
    question: "Quels sports pratiquez-vous ? (Sélectionnez au moins un)",
    type: "multiple",
    options: [
      { value: "fitness", label: "Fitness / Musculation", icon: "🏋️" },
      { value: "yoga", label: "Yoga", icon: "🧘" },
      { value: "running", label: "Course à Pied", icon: "🏃" },
      { value: "cycling", label: "Cyclisme", icon: "🚴" },
      { value: "swimming", label: "Natation", icon: "🏊" },
    ],
  },
  {
    id: "objectives",
    category: "Objectifs",
    question: "Vos objectifs principaux ?",
    type: "multiple",
    options: [
      { value: "strength", label: "Améliorer la Force", icon: "💥" },
      { value: "flexibility", label: "Gagner en Flexibilité", icon: "🎯" },
      { value: "endurance", label: "Développer l'Endurance", icon: "⏱️" },
      { value: "recovery", label: "Récupération", icon: "✨" },
    ],
  },
  {
    id: "injuries",
    category: "Préoccupations de Santé",
    question: "Avez-vous des blessures ou limitations ? (Optionnel)",
    type: "multiple",
    options: [
      { value: "back_pain", label: "Douleurs Lombaires", icon: "⚠️" },
      { value: "knee_pain", label: "Douleurs Genoux", icon: "⚠️" },
      { value: "shoulder", label: "Problèmes d'Épaule", icon: "⚠️" },
      { value: "none", label: "Aucune", icon: "✅" },
    ],
  },
]

export default function QuestionnaireStep({ onComplete }: { onComplete: (profile: any) => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.type === "single") {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
    } else {
      const currentValues = (answers[currentQuestion.id] as string[]) || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: newValues }))
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      onComplete({
        level: answers.level,
        sports: answers.sports || [],
        objectives: answers.objectives || [],
        injuries: answers.injuries || [],
      })
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const isCurrentValid =
    currentQuestion.type === "single"
      ? !!answers[currentQuestion.id]
      : currentQuestion.id === "injuries" || (answers[currentQuestion.id] as string[])?.length > 0

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressIndicator current={currentQuestionIndex + 1} total={QUESTIONS.length} />

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-8">
        <div className="mb-2">
          <span className="text-sm font-semibold text-decathlon-blue uppercase tracking-wide">
            {currentQuestion.category}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{currentQuestion.question}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {currentQuestion.options.map((option) => {
            const isSelected =
              currentQuestion.type === "single"
                ? answers[currentQuestion.id] === option.value
                : (answers[currentQuestion.id] as string[])?.includes(option.value)

            return (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-decathlon-blue bg-blue-50"
                    : "border-gray-200 bg-white hover:border-decathlon-blue hover:bg-blue-50"
                }`}
              >
                <div className="text-3xl mb-3">{option.icon}</div>
                <p className={`font-semibold ${isSelected ? "text-decathlon-blue" : "text-gray-900"}`}>
                  {option.label}
                </p>
              </button>
            )
          })}
        </div>

        <div className="flex gap-4 justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 bg-transparent"
          >
            ← Précédent
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isCurrentValid}
            className="flex-1 bg-decathlon-blue hover:bg-blue-800 text-white"
          >
            {currentQuestionIndex === QUESTIONS.length - 1 ? "Voir Résultats" : "Suivant"} →
          </Button>
        </div>
      </div>
    </div>
  )
}
