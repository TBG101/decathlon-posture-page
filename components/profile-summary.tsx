interface UserProfile {
  level: string
  sports: string[]
  objectives: string[]
  injuries: string[]
}

const LABEL_MAP: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
  fitness: "Fitness / Musculation",
  yoga: "Yoga",
  running: "Course à Pied",
  cycling: "Cyclisme",
  swimming: "Natation",
  strength: "Améliorer la Force",
  flexibility: "Gagner en Flexibilité",
  endurance: "Développer l'Endurance",
  recovery: "Récupération",
  back_pain: "Douleurs Lombaires",
  knee_pain: "Douleurs Genoux",
  shoulder: "Problèmes d'Épaule",
  none: "Aucune",
}

export default function ProfileSummary({ profile }: { profile: UserProfile }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl p-6 border border-blue-100">
        <div className="text-sm text-gray-600 font-semibold uppercase mb-2">Niveau</div>
        <div className="text-2xl font-bold text-decathlon-blue">{LABEL_MAP[profile.level]}</div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-blue-100">
        <div className="text-sm text-gray-600 font-semibold uppercase mb-2">Sports</div>
        <div className="space-y-1">
          {profile.sports.map((sport) => (
            <div key={sport} className="text-sm font-medium text-gray-800">
              • {LABEL_MAP[sport]}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-blue-100">
        <div className="text-sm text-gray-600 font-semibold uppercase mb-2">Objectifs</div>
        <div className="space-y-1">
          {profile.objectives.slice(0, 2).map((obj) => (
            <div key={obj} className="text-sm font-medium text-gray-800">
              • {LABEL_MAP[obj]}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-blue-100">
        <div className="text-sm text-gray-600 font-semibold uppercase mb-2">Préoccupations</div>
        <div className="space-y-1">
          {profile.injuries.length > 0 ? (
            profile.injuries.map((injury) => (
              <div key={injury} className="text-sm font-medium text-gray-800">
                • {LABEL_MAP[injury]}
              </div>
            ))
          ) : (
            <div className="text-sm font-medium text-green-600">✓ Aucune</div>
          )}
        </div>
      </div>
    </div>
  )
}
