import { Header } from '../components/layout/Header'
import { Hero } from '../components/home/Hero'
import { WodList } from '../components/home/WodList'
import { CompetitionDetails } from '../components/home/CompetitionDetails'
import { useFeaturedCompetition } from '../hooks/useFeaturedCompetition'

export function HomePage() {
  const { competition, loading, error } = useFeaturedCompetition()

  return (
    <div className="app-shell">
      <Header />
      <main>
        {loading && (
          <section className="home-loading" aria-live="polite" aria-busy="true">
            <div className="home-loading__heading">
              <strong>Cargando Crossfit Gaymes</strong>
              <span>Obteniendo información de la competencia…</span>
            </div>
            <div
              className="home-loading__track"
              role="progressbar"
              aria-label="Cargando información"
            >
              <span />
            </div>
          </section>
        )}

        {!loading && error && (
          <div className="status-banner status-banner--error" role="alert">
            {error}
          </div>
        )}

        {!loading && competition && (
          <>
            <Hero competition={competition} />

            <div className="content-grid">
              <WodList wods={competition.wods ?? []} />
              <CompetitionDetails competition={competition} />
            </div>
          </>
        )}
      </main>

      <footer>
        <span>© 2026 Crossfit Gaymes</span>
        <span>Diseñado para competir.</span>
      </footer>
    </div>
  )
}
