import { Users } from 'lucide-react'
import type { CompetitionCategory } from '../../types/competition'

interface CategoryListProps {
  categories: CompetitionCategory[]
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <section id="categorias" className="panel">
      <div className="section-heading">
        <span className="eyebrow">Participación</span>
        <h2>Categorías</h2>
      </div>

      <div className="category-list">
        {categories.map(category => {
          const available = category.capacity - category.registered
          const percentage = (category.registered / category.capacity) * 100

          return (
            <article className="category-row" key={category.id}>
              <div>
                <h3>{category.name}</h3>
                <p><Users size={15} /> {available} cupos disponibles</p>
              </div>
              <div className="capacity">
                <span>{category.registered}/{category.capacity}</span>
                <div className="progress" aria-label={`${percentage}% ocupado`}>
                  <span style={{ width: `${percentage}%` }} />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
