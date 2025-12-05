# 🏋️ Decathlon Posture & Movement Assessment

A modern web application that helps users optimize their movement patterns and prevent injuries through personalized posture assessments and exercise recommendations.

## ✨ Features

- **Interactive Questionnaire**: Multi-step assessment covering fitness level, sports activities, objectives, and health concerns
- **Personalized Recommendations**: AI-powered exercise suggestions based on user profile
- **Detailed Movement Instructions**: Step-by-step guidance with visual descriptions and safety warnings
- **Product Recommendations**: Curated Decathlon product suggestions tailored to user needs
- **PDF Export**: Download personalized plans as PDF documents
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Theme Support**: Light and dark mode support
- **Accessibility**: Built with Radix UI for comprehensive accessibility features

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd decathlon-posture-page
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with server-side rendering
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [PostCSS](https://postcss.org/) - CSS transformations
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
  - [Shadcn/ui](https://ui.shadcn.com/) - Component library
- **Forms**: 
  - [React Hook Form](https://react-hook-form.com/) - Performant form handling
  - [@hookform/resolvers](https://github.com/react-hook-form/resolvers) - Form validation resolvers
- **PDF Generation**: [jsPDF](https://github.com/parallax/jspdf) - PDF export functionality
- **Icons**: [Lucide React](https://lucide.dev/) - Modern icon library
- **Date Utils**: [date-fns](https://date-fns.org/) - Lightweight date manipulation
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## 📁 Project Structure

```
decathlon-posture-page/
├── app/                          # Next.js app directory
│   ├── api/
│   │   └── exercises/           # Exercise recommendation API routes
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page (main application)
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                       # Reusable UI components (Radix + Shadcn)
│   ├── header.tsx               # Application header
│   ├── questionnaire-step.tsx    # User assessment questionnaire
│   ├── results-step.tsx          # Results and recommendations display
│   ├── profile-summary.tsx       # User profile overview
│   ├── instructions-section.tsx  # Movement instructions
│   ├── movement-card.tsx         # Individual movement card
│   ├── products-section.tsx      # Product recommendations
│   ├── product-card.tsx          # Individual product card
│   ├── progress-indicator.tsx    # Questionnaire progress tracker
│   └── theme-provider.tsx        # Theme context provider
├── hooks/                        # Custom React hooks
│   ├── use-toast.ts             # Toast notification hook
│   └── use-mobile.ts            # Mobile detection hook
├── lib/                          # Utility functions and helpers
│   ├── recommendations.ts        # Exercise recommendation logic
│   ├── exercise-api.ts          # API integration for exercises
│   ├── pdf-generator.ts         # PDF export functionality
│   ├── products.ts              # Product data and helpers
│   └── utils.ts                 # General utility functions
├── public/                       # Static assets
├── styles/                       # Additional stylesheets
├── tsconfig.json                # TypeScript configuration
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
└── components.json              # Component library configuration
```

## 🎯 How It Works

### User Flow

1. **Assessment Phase**: Users answer a multi-step questionnaire covering:
   - Fitness level (Beginner, Intermediate, Advanced)
   - Sports activities practiced
   - Main objectives (Strength, Flexibility, Endurance, Recovery)
   - Health concerns and injuries

2. **Analysis Phase**: The app analyzes responses against the exercise database

3. **Results Phase**: Users receive:
   - Personalized movement instructions
   - Exercise recommendations with difficulty levels
   - Decathlon product suggestions
   - Downloadable personalized plan as PDF

### Key Components

- **QuestionnaireStep**: Multi-step form with progress tracking
- **ResultsStep**: Displays recommendations and products
- **InstructionsSection**: Detailed exercise guidance with warnings
- **ProductsSection**: Recommended products with descriptions
- **ProfileSummary**: Visual overview of user profile

## 🔧 Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## 📝 API Routes

### `/api/exercises`

Endpoint for exercise recommendations (if applicable).

**Usage**: Called to fetch enriched exercise data based on user profile.

## 🎨 Customization

### Styling

- Edit `app/globals.css` or `styles/globals.css` for global styles
- Modify `tailwind.config.ts` for Tailwind configuration
- Components use Tailwind utility classes for styling

### Exercise Database

Update `lib/recommendations.ts` to add or modify:
- Exercise instructions
- Difficulty levels
- Target muscles and movements

### Products

Update `lib/products.ts` to add or modify product recommendations.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
