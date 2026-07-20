import { Header } from '../components/layout/Header'
import { Hero } from '../components/home/Hero'
import { WodList } from '../components/home/WodList'
import { CompetitionDetails } from '../components/home/CompetitionDetails'
import { useFeaturedCompetition } from '../hooks/useFeaturedCompetition'

export function HomePage() {
  const { competition, loading, usingFallback } = useFeaturedCompetition()

  return (
    <div className="app-shell">
      <Header />
      <main>
        {usingFallback && (
          <div className="status-banner">
            Mostrando información de demostración mientras el backend no está disponible.
          </div>
        )}

        <Hero competition={competition} />

        <div className="content-grid">
          <WodList wods={competition.wods ?? []} />
          <CompetitionDetails competition={competition} />
        </div>

        {loading && <span className="sr-only">Cargando información...</span>}
      </main>

      <footer>
        <span>© 2026 Crossfit Gaymes</span>
        <span>Diseñado para competir.</span>
      </footer>
    </div>
  )
}
