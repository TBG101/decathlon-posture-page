"use client"

import { useState } from "react"
import QuestionnaireStep from "@/components/questionnaire-step"
import ResultsStep from "@/components/results-step"
import Header from "@/components/header"

export default function Home() {
  const [step, setStep] = useState<"questionnaire" | "results">("questionnaire")
  const [userProfile, setUserProfile] = useState<{
    level: string
    sports: string[]
    objectives: string[]
    injuries: string[]
  } | null>(null)

  const handleQuestionnaireComplete = (profile: any) => {
    setUserProfile(profile)
    setStep("results")
  }

  const handleReset = () => {
    setUserProfile(null)
    setStep("questionnaire")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        {step === "questionnaire" ? (
          <QuestionnaireStep onComplete={handleQuestionnaireComplete} />
        ) : (
          <ResultsStep profile={userProfile} onReset={handleReset} />
        )}
      </main>
    </div>
  )
}
