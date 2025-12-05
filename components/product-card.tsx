interface Product {
  id: string
  name: string
  category: string
  price: string
  image: string
  relevance: string
  icon: string
  rating: number
  link?: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-linear-to-br from-blue-100 to-blue-50 h-48 flex items-center justify-center">
        <div className="text-6xl">{product.icon}</div>
      </div>

      <div className="p-4">
        <div className="text-xs text-decathlon-blue font-semibold uppercase mb-1">{product.category}</div>
        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400">{"★".repeat(Math.floor(product.rating))}</span>
          <span className="text-xs text-gray-600">({product.rating})</span>
        </div>

        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">Pertinence</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-decathlon-blue h-2 rounded-full"
              style={{ width: `${Number.parseInt(product.relevance) * 10}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{product.price}</span>
          {product.link ? (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-decathlon-blue text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Voir
            </a>
          ) : (
            <button className="px-4 py-2 bg-decathlon-blue text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Voir
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
