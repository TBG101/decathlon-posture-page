import { getProductRecommendations } from "./products"
import { getRecommendations } from "./recommendations"

interface UserProfile {
  level: string
  sports: string[]
  objectives: string[]
  injuries: string[]
}

interface Movement {
  id: string
  title: string
  description: string
  icon: string
  difficulty: string
  duration: string
  tags: string[]
  instructions: string[]
  warnings: string
  imageUrl?: string
}

export async function generatePlanPDF(profile: UserProfile) {
  const products = getProductRecommendations(profile)
  const recommendations = getRecommendations(profile)
  const exercises = recommendations.movements

  // Create HTML content for the plan
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Mon Plan Posture Personnalisé</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f5f5f5;
        }
        .container {
          max-width: 850px;
          margin: 0 auto;
          background: white;
          padding: 40px;
        }
        header {
          background: linear-gradient(135deg, #0066cc 0%, #003d99 100%);
          color: white;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 40px;
          text-align: center;
        }
        header h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .section {
          margin-bottom: 40px;
        }
        .section h2 {
          color: #0066cc;
          font-size: 22px;
          margin-bottom: 20px;
          border-bottom: 2px solid #0066cc;
          padding-bottom: 10px;
        }
        .profile-box {
          background: #f0f4ff;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .profile-item {
          margin-bottom: 12px;
          display: flex;
        }
        .profile-label {
          font-weight: 600;
          color: #0066cc;
          min-width: 120px;
        }
        .profile-value {
          color: #555;
        }
        .exercise-item {
          background: #f9f9f9;
          padding: 15px;
          margin-bottom: 15px;
          border-left: 4px solid #0066cc;
          border-radius: 4px;
        }
        .exercise-item h3 {
          color: #333;
          font-size: 16px;
          margin-bottom: 8px;
        }
        .exercise-item p {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }
        .product-item {
          background: #f9f9f9;
          padding: 15px;
          margin-bottom: 15px;
          border-left: 4px solid #0066cc;
          border-radius: 4px;
        }
        .product-item h3 {
          color: #333;
          font-size: 16px;
          margin-bottom: 8px;
        }
        .product-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #666;
        }
        .rating {
          color: #ffc107;
          font-size: 14px;
        }
        .price {
          font-weight: 600;
          color: #0066cc;
          font-size: 16px;
        }
        .tips {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        .tips h4 {
          color: #856404;
          margin-bottom: 8px;
        }
        .tips p {
          color: #856404;
          font-size: 14px;
          line-height: 1.5;
        }
        .date {
          text-align: center;
          color: #999;
          font-size: 12px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
        @media print {
          body {
            background: white;
          }
          .container {
            max-width: 100%;
            margin: 0;
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>✨ Mon Plan Posture Personnalisé</h1>
          <p>Un plan d'entraînement optimisé basé sur vos besoins</p>
        </header>

        <div class="section">
          <h2>Votre Profil</h2>
          <div class="profile-box">
            <div class="profile-item">
              <span class="profile-label">Niveau:</span>
              <span class="profile-value">${capitalizeFirst(profile.level)}</span>
            </div>
            <div class="profile-item">
              <span class="profile-label">Sports:</span>
              <span class="profile-value">${profile.sports.join(", ") || "Non spécifié"}</span>
            </div>
            <div class="profile-item">
              <span class="profile-label">Objectifs:</span>
              <span class="profile-value">${profile.objectives.join(", ") || "Non spécifié"}</span>
            </div>
            <div class="profile-item">
              <span class="profile-label">Blessures/Limitations:</span>
              <span class="profile-value">${profile.injuries.join(", ") || "Aucune"}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>💪 Programme d'Exercices Recommandés</h2>
          <div class="tips">
            <h4>💡 Conseil</h4>
            <p>Effectuez ces exercices 3-4 fois par semaine pour des résultats optimaux. N'oubliez pas de faire un échauffement de 5-10 minutes avant de commencer.</p>
          </div>
          ${exercises
            .map((exercise: Movement) => {
              const instructions = exercise.instructions.join("<br>")
              return `
            <div class="exercise-item">
              <h3>${exercise.icon} ${exercise.title}</h3>
              <p><strong>Difficulté:</strong> ${exercise.difficulty}</p>
              <p><strong>Durée:</strong> ${exercise.duration}</p>
              <p><strong>Catégories:</strong> ${exercise.tags.join(", ")}</p>
              <p><strong>Instructions:</strong><br>${instructions}</p>
              <p style="color: #d9534f; margin-top: 10px;"><strong>⚠️ Attention:</strong> ${exercise.warnings}</p>
            </div>
          `
            })
            .join("")}
        </div>

        <div class="section">
          <h2>🛍️ Équipements Recommandés</h2>
          <div class="tips">
            <h4>💡 Conseil</h4>
            <p>Ces équipements sont sélectionnés pour optimiser vos entraînements en fonction de votre profil. Vous pouvez les acheter chez Decathlon.</p>
          </div>
          ${products
            .map(
              (product) => `
            <div class="product-item">
              <h3>${product.name}</h3>
              <p><strong>Catégorie:</strong> ${product.category}</p>
              <div class="product-details">
                <span class="rating">${"★".repeat(Math.floor(product.rating))} (${product.rating})</span>
                <span class="price">${product.price}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="tips">
          <h4>🎯 Points Importants</h4>
          <p>
            • Écoutez votre corps - arrêtez si vous ressentez de la douleur<br>
            • Progressez graduellement - augmentez l'intensité progressivement<br>
            • Restez régulier - la consistance est clé<br>
            • Consultez un professionnel si vous avez des doutes<br>
            • Associez l'entraînement avec une bonne nutrition et du repos
          </p>
        </div>

        <div class="date">
          <p>Plan généré le ${new Date().toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Create a blob from the HTML
  const blob = new Blob([htmlContent], { type: "text/html;charset=UTF-8" })

  // Create a temporary link element
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.href = url
  link.download = `Mon-Plan-Posture-${new Date().getTime()}.html`

  // Trigger the download
  document.body.appendChild(link)
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  // Also trigger print dialog for PDF conversion
  setTimeout(() => {
    window.print()
  }, 500)
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
