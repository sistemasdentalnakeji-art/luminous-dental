// Blog, las mismas tres vistas que el de Dental Nakeji: portada (índice de temas, estantes de artículos, llamada final), categoría y artículo
// ("camino del tema": los artículos del tema, la hoja con la respuesta corta y las secciones, y el siguiente artículo).
// En inglés y español (useLang). Cada artículo lleva una foto de la clínica (campo image del JSON; origen en docs/bitacora.md); sin foto, la tarjeta usa una franja con el ícono del tema.
import { Icon, type IconName } from '@/components/Icon'
import { clinic } from '@/content/clinic'
import { hrefOf } from '@/config/routes'
import { type Article, type Category, blogApi, blogText, linksIn, readingMinutes } from '@/lib/blog'
import { useLang } from '@/lib/lang'
import { Link, NewTab } from '@/lib/router'

const topicIcon: Record<string, IconName> = {
  'implants-and-tooth-replacement': 'implant',
  'cosmetic-and-restorative-dentistry': 'sparkle',
  orthodontics: 'braces',
  'cleanings-and-extractions': 'tooth',
}

function Crumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  const T = blogText[useLang()]
  return (
    <nav className="crumbs" aria-label={T.crumbs}>
      <ol>{trail.map((c) => <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}</ol>
    </nav>
  )
}

/** Foto del artículo en webp de 640 y 1280 px; el ancho real lo decide el navegador con sizes. */
function Photo({ article, sizes, eager }: { article: Article; sizes: string; eager?: boolean }) {
  return (
    <img
      src={`${article.image}-640.webp`}
      srcSet={`${article.image}-640.webp 640w, ${article.image}-1280.webp 1280w`}
      sizes={sizes}
      alt={article.imageAlt}
      width={640}
      height={400}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

/** Tarjeta como la de Dental Nakeji: foto con degradado (o franja con ícono si no hay foto), minutos de lectura, título y extracto de 2 líneas; al pie, logo y tema. */
function Card({ article, topic }: { article: Article; topic?: boolean }) {
  const lang = useLang()
  const T = blogText[lang]
  const { categoryOf, path } = blogApi(lang)
  const cat = categoryOf(article.category)
  return (
    <Link className={`blog-card${article.image ? ' blog-card--photo' : ''}`} href={path(article.key)}>
      <span className='blog-card__frame'>
        {article.image ? (
          <span className='blog-card__media'><Photo article={article} sizes='(max-width: 599.98px) 100vw, (max-width: 959.98px) 50vw, 400px' /><span className='blog-card__shade' /></span>
        ) : (
          <span className='blog-card__media blog-card__media--band' aria-hidden='true'><Icon name={topicIcon[article.category] ?? 'tooth'} size={40} /></span>
        )}
        <span className='blog-card__body'>
          <span className='blog-card__stamp'><span className='blog-card__time'><Icon name='clock' size={14} />{T.minutes(readingMinutes(article))}</span></span>
          <h3 className='blog-card__title'>{article.title}</h3>
          <span className='blog-card__excerpt'>{article.excerpt}</span>
        </span>
        <span className='blog-card__meta'>
          <img className='blog-card__brand' src={`${import.meta.env.BASE_URL}logo.webp`} width={520} height={297} alt='' aria-hidden='true' />
          {topic && cat && <span className='blog-card__topic'>{cat.name}</span>}
        </span>
      </span>
    </Link>
  )
}

export function BlogHub() {
  const lang = useLang()
  const T = blogText[lang]
  const { blog, articlesIn, path } = blogApi(lang)
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
              <Link className="btn btn-ghost" href={hrefOf('services', lang)}>{T.allServices}</Link>
            </div>
          </div>
          <nav className="blog-index" aria-labelledby="blog-topics">
            <h2 id="blog-topics">{hub.exploreTitle}</h2>
            <p>{hub.exploreText}</p>
            <ul>
              {categories.map((c) => (
                <li key={c.key}><Link href={path(c.key)}><span>{c.name}</span><span className="blog-count">{T.articleCount(articlesIn(c).length)}</span></Link></li>
              ))}
            </ul>
          </nav>
        </div>
        <div id="articles" className="blog-library">
          <h2 className="h2 h2--sm">{hub.featuredText}</h2>
          <p className="hub-lead">{hub.featuredLead}</p>
          {categories.map((c) => (
            <section key={c.key} id={`topic-${c.key}`} className="blog-shelf" aria-labelledby={`topic-${c.key}-h`}>
              <h3 id={`topic-${c.key}-h`}><Link href={path(c.key)}>{c.name}</Link></h3>
              <p>{c.description}</p>
              <div className="blog-grid">{articlesIn(c).map((a) => <Card key={a.key} article={a} />)}</div>
            </section>
          ))}
        </div>
        <div className="blog-cta">
          <h2>{hub.ctaTitle}</h2>
          <p>{hub.ctaText}</p>
          <Link className="btn" href={clinic.bookingUrl}>{T.book}</Link>
        </div>
      </section>
    </>
  )
}

export function BlogCategory({ category }: { category: Category }) {
  const lang = useLang()
  const T = blogText[lang]
  const { blog, articlesIn, path } = blogApi(lang)
  const others = blog.categories.filter((c) => c.key !== category.key)
  return (
    <>
      <section className="sec wrap pg blog" aria-labelledby="blog-cat-h">
        <Crumbs trail={[{ label: 'Blog', href: path() }, { label: category.name }]} />
        <h1 className="h2" id="blog-cat-h">{category.name}</h1>
        <p className="hub-lead">{category.intro}</p>
        <h2 className="blog-more">{T.inCategory}</h2>
        <div className="blog-grid">{articlesIn(category).map((a) => <Card key={a.key} article={a} />)}</div>
        <h2 className="blog-more">{T.moreTopics}</h2>
        <ul className="blog-topics">
          {others.map((c) => <li key={c.key}><Link href={path(c.key)}><strong>{c.name}</strong><span>{c.description}</span></Link></li>)}
        </ul>
      </section>
    </>
  )
}

export function BlogArticle({ article }: { article: Article }) {
  const lang = useLang()
  const T = blogText[lang]
  const { blog, categoryOf, articlesIn, path } = blogApi(lang)
  const category = categoryOf(article.category)
  const topic = category ? articlesIn(category) : [article]
  const step = topic.findIndex((a) => a.key === article.key) + 1
  const all = blog.categories.flatMap((c) => articlesIn(c))
  const next = all[(all.findIndex((a) => a.key === article.key) + 1) % all.length]
  const stepLabel = T.step(step, topic.length)
  const trail: { label: string; href?: string }[] = [{ label: 'Blog', href: path() }]
  if (category) trail.push({ label: category.name, href: path(category.key) })
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
          {article.image && <p className="art-photo"><Photo article={article} sizes="(min-width: 1100px) 1000px, 100vw" eager /></p>}
        </header>
        <div className="art-body">
          <nav className="art-path" aria-label={T.inCategory}>
            <p>{category ? <Link href={path(category.key)}>{category.name}</Link> : article.category}<span>{stepLabel}</span></p>
            <ol>
              {topic.map((a) => (
                <li key={a.key}><Link href={path(a.key)} aria-current={a.key === article.key ? 'page' : undefined}>{a.title.split(':')[0]}</Link></li>
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
                  <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}<Icon name="arrowRight" size={16} /><NewTab /></a></li>
                ))}
              </ul>
            </footer>
          </article>
          <aside className="art-next">
            <Link href={path(next.key)}>
              <span className="art-next__label">{next.category === article.category ? T.nextInTopic : T.nextTopic}<Icon name="arrowRight" size={18} /></span>
              <span className="art-next__title">{next.title}</span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}
