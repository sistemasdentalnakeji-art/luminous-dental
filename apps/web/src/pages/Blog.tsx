// Blog, las mismas tres vistas que el de Dental Nakeji: portada (índice de temas, estantes de artículos, llamada final), categoría y artículo
// ("camino del tema": los artículos del tema, la hoja con la respuesta corta y las secciones, y el siguiente artículo).
// Solo en inglés. Aún no hay fotos, así que las tarjetas llevan una franja de color con el ícono del tema.
import { Appointment } from '@/components/Appointment'
import { Icon, type IconName } from '@/components/Icon'
import { type Article, type Category, articlesIn, blog, blogPath, blogText as T, categoryOf, linksIn, readingMinutes } from '@/lib/blog'
import { Link } from '@/lib/router'

const topicIcon: Record<string, IconName> = {
  'implants-and-tooth-replacement': 'implant',
  'cosmetic-and-restorative-dentistry': 'sparkle',
  'orthodontics-and-pediatric-dentistry': 'braces',
  'cleanings-and-extractions': 'tooth',
}

function Crumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label={T.crumbs}>
      <ol>{trail.map((c) => <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}</ol>
    </nav>
  )
}

function Card({ article, topic }: { article: Article; topic?: boolean }) {
  const cat = categoryOf(article.category)
  return (
    <Link className="blog-card" href={blogPath(article.key)}>
      <span className="blog-card__band" aria-hidden="true"><Icon name={topicIcon[article.category] ?? 'tooth'} size={40} /></span>
      <span className="blog-card__body">
        <span className="blog-card__stamp"><Icon name="clock" size={14} />{T.minutes(readingMinutes(article))}</span>
        <h4>{article.title}</h4>
        <span className="blog-card__excerpt">{article.excerpt}</span>
        {topic && cat && <span className="blog-card__topic">{cat.name}</span>}
      </span>
    </Link>
  )
}

export function BlogHub() {
  const { hub, categories } = blog
  return (
    <>
      <section className="sec wrap pg blog" aria-labelledby="blog-h">
        <div className="blog-hero">
          <div>
            <p className="pill">{hub.label}</p>
            <h1 className="h2" id="blog-h">{hub.h1}</h1>
            <p className="hub-lead">{hub.intro}</p>
            <div className="hero-cta">
              <a className="btn" href="#articles">{T.explore}</a>
              <Link className="btn btn-ghost" href="/services">{T.allServices}</Link>
            </div>
          </div>
          <nav className="blog-index" aria-labelledby="blog-topics">
            <h2 id="blog-topics">{hub.exploreTitle}</h2>
            <p>{hub.exploreText}</p>
            <ul>
              {categories.map((c) => (
                <li key={c.key}><Link href={blogPath(c.key)}><span>{c.name}</span><span className="blog-count">{T.articleCount(articlesIn(c).length)}</span></Link></li>
              ))}
            </ul>
          </nav>
        </div>
        <div id="articles" className="blog-library">
          <h2 className="h2 h2--sm">{hub.featuredText}</h2>
          <p className="hub-lead">{hub.featuredLead}</p>
          {categories.map((c) => (
            <section key={c.key} id={`topic-${c.key}`} className="blog-shelf" aria-labelledby={`topic-${c.key}-h`}>
              <h3 id={`topic-${c.key}-h`}><Link href={blogPath(c.key)}>{c.name}</Link></h3>
              <p>{c.description}</p>
              <div className="blog-grid">{articlesIn(c).map((a) => <Card key={a.key} article={a} />)}</div>
            </section>
          ))}
        </div>
        <div className="blog-cta">
          <h2>{hub.ctaTitle}</h2>
          <p>{hub.ctaText}</p>
          <a className="btn" href="#appointment">{T.book}</a>
        </div>
      </section>
      <Appointment />
    </>
  )
}

export function BlogCategory({ category }: { category: Category }) {
  const others = blog.categories.filter((c) => c.key !== category.key)
  return (
    <>
      <section className="sec wrap pg blog" aria-labelledby="blog-cat-h">
        <Crumbs trail={[{ label: 'Blog', href: '/blog' }, { label: category.name }]} />
        <h1 className="h2" id="blog-cat-h">{category.name}</h1>
        <p className="hub-lead">{category.intro}</p>
        <h2 className="blog-more">{T.inCategory}</h2>
        <div className="blog-grid">{articlesIn(category).map((a) => <Card key={a.key} article={a} />)}</div>
        <h2 className="blog-more">{T.moreTopics}</h2>
        <ul className="blog-topics">
          {others.map((c) => <li key={c.key}><Link href={blogPath(c.key)}><strong>{c.name}</strong><span>{c.description}</span></Link></li>)}
        </ul>
      </section>
      <Appointment />
    </>
  )
}

export function BlogArticle({ article }: { article: Article }) {
  const category = categoryOf(article.category)
  const topic = category ? articlesIn(category) : [article]
  const step = topic.findIndex((a) => a.key === article.key) + 1
  const all = blog.categories.flatMap((c) => articlesIn(c))
  const next = all[(all.findIndex((a) => a.key === article.key) + 1) % all.length]
  const stepLabel = T.step(step, topic.length)
  const trail: { label: string; href?: string }[] = [{ label: 'Blog', href: '/blog' }]
  if (category) trail.push({ label: category.name, href: blogPath(category.key) })
  trail.push({ label: article.title })
  return (
    <>
      <section className="sec wrap pg blog" aria-labelledby="article-h">
        <header className="art-hero">
          <Crumbs trail={trail} />
          <h1 className="h2" id="article-h">{article.title}</h1>
          <p className="hub-lead">{article.lead}</p>
          <p className="art-stamp">
            <span className="art-time"><Icon name="clock" size={16} />{T.minutes(readingMinutes(article))}</span>
            {category && <span>{`${category.name} · ${stepLabel}`}</span>}
          </p>
        </header>
        <div className="art-body">
          <nav className="art-path" aria-label={T.inCategory}>
            <p>{category ? <Link href={blogPath(category.key)}>{category.name}</Link> : article.category}<span>{stepLabel}</span></p>
            <ol>
              {topic.map((a) => (
                <li key={a.key}><Link href={blogPath(a.key)} aria-current={a.key === article.key ? 'page' : undefined}>{a.title.split(':')[0]}</Link></li>
              ))}
            </ol>
          </nav>
          <article className="art-sheet" aria-labelledby="article-h">
            <section>
              <h2>{T.answer}</h2>
              <p>{article.answer}</p>
            </section>
            {article.sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              </section>
            ))}
            <footer className="art-sources">
              <h2>{T.sources}</h2>
              <ul>
                {linksIn(article.sources).map((l) => (
                  <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<Icon name="arrowRight" size={16} /></a></li>
                ))}
              </ul>
            </footer>
          </article>
          <aside className="art-next">
            <Link href={blogPath(next.key)}>
              <span className="art-next__label">{next.category === article.category ? T.nextInTopic : T.nextTopic}<Icon name="arrowRight" size={18} /></span>
              <span className="art-next__title">{next.title}</span>
            </Link>
          </aside>
        </div>
      </section>
      <Appointment />
    </>
  )
}
