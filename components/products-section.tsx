"use client"

import { getProductRecommendations } from "@/lib/products"
import ProductCard from "@/components/product-card"

interface UserProfile {
  level: string
  sports: string[]
  objectives: string[]
  injuries: string[]
}

export default function ProductsSection({ profile }: { profile: UserProfile }) {
  const products = getProductRecommendations(profile)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🛍️ Niveau 4: Produits Decathlon Pertinents</h3>
        <p className="text-gray-600">Sélection d'équipements recommandés pour votre pratique</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
