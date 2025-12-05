export default function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">
          Étape {current} sur {total}
        </span>
        <span className="text-sm font-semibold text-decathlon-blue">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-decathlon-blue h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
