import { Container } from '@/components/Container'
import { RSSIcon } from './SocialIcons'

export function SimpleLayout({
  title,
  intro,
  type,
  children,
}: {
  title: string
  intro: string
  type?: string
  children?: React.ReactNode
}) {
  const rssButton = (
    <a href='/feed.xml' target='_blank' >
      <button
        type="button"
        className="inline-flex items-center gap-x-1.5 rounded-md bg-customOrange px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-customOrangeDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customOrange mt-4"
      >
        Subscribe
        <RSSIcon />
      </button>
    </a>
  );
  
  return (
    <Container className="mt-16 sm:mt-32">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h1>
          <div>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              {intro}
            </p>
            {type === 'articles' && rssButton}
          </div>
        </header>
        {children && <div className="mt-16 sm:mt-20">{children}</div>}
      </Container>
  );
}