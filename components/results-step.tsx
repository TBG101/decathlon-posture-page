"use client";

import { Button } from "@/components/ui/button";
import InstructionsSection from "@/components/instructions-section";
import ProductsSection from "@/components/products-section";
import ProfileSummary from "@/components/profile-summary";
import { generatePlanPDF } from "@/lib/pdf-generator";

interface UserProfile {
  level: string;
  sports: string[];
  objectives: string[];
  injuries: string[];
}

export default function ResultsStep({
  profile,
  onReset,
}: {
  profile: UserProfile | null;
  onReset: () => void;
}) {
  if (!profile) return null;

  const handleDownloadPlan = async () => {
    await generatePlanPDF(profile);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-decathlon-blue to-blue-800 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">✨ Votre Plan Personnalisé</h2>
        <p className="text-blue-100">
          Basé sur vos réponses, découvrez comment optimiser vos mouvements et
          prévenir les blessures
        </p>
      </div>

      <ProfileSummary profile={profile} />

      <InstructionsSection profile={profile} />

      <ProductsSection profile={profile} />

      <div className="flex gap-4 justify-center pb-8">
        <Button
          onClick={onReset}
          variant="outline"
          className="px-8 py-3 border-2 border-decathlon-blue text-decathlon-blue hover:bg-blue-50 bg-transparent"
        >
          ← Recommencer l'Évaluation
        </Button>
        <Button
          onClick={handleDownloadPlan}
          className="px-8 py-3 bg-decathlon-blue hover:bg-blue-800 text-white"
        >
          Télécharger Mon Plan 📥
        </Button>
      </div>
    </div>
  );
}
