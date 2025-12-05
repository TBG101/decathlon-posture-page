export default function Header() {
  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-decathlon-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">DECATHLON DIGITAL</h1>
            <p className="text-xs text-gray-600">Prévention des Blessures & Analyse Posturale</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 font-medium">Devenez le CTO de Votre Santé Posturale</p>
      </div>
    </header>
  )
}
