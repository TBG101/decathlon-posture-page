interface Movement {
  id: string
  title: string
  description: string
  icon: string
  difficulty: string
  duration: string
  tags: string[]
  imageUrl?: string
}

export default function MovementCard({
  movement,
  isSelected,
}: {
  movement: Movement
  isSelected: boolean
}) {
  return (
    <div
      className={`rounded-xl p-6 border-2 transition-all cursor-pointer ${
        isSelected
          ? "bg-blue-50 border-decathlon-blue shadow-lg"
          : "bg-white border-gray-200 hover:border-decathlon-blue"
      }`}
    >
      <div className="text-5xl mb-3">{movement.icon}</div>
      <h4 className="font-bold text-lg text-gray-900 mb-2">{movement.title}</h4>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{movement.description}</p>
      <div className="flex gap-2 text-xs">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">{movement.difficulty}</span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">{movement.duration}</span>
      </div>
    </div>
  )
}
