import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import logoBlueboard from '@/images/logos/blueboard.svg'
import logoMKDev from '@/images/logos/mkdev.png'
import logoWayfair from '@/images/logos/wayfair.png'
import logoHenryMeds from '@/images/logos/henry.png'
import image1 from '@/images/photos/image-1.png'
import image2 from '@/images/photos/image-2.png'
import image3 from '@/images/photos/image-3.png'
import image4 from '@/images/photos/image-4.png'
import image5 from '@/images/photos/image-5.png'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import TypingAnimation from '@/components/TypingAnimation'
import { homeTextVariations } from './enums'
import Newsletter from '@/components/NewsLetter'
import Chat from '@/components/Chat'

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

interface Role {
  company: string
  role1: {
    title: string
    start: string | { label: string; dateTime: string }
    end: string | { label: string; dateTime: string }
  }
  role2?: {
    title: string
    start: string | { label: string; dateTime: string }
    end: string | { label: string; dateTime: string }
  }
  logo: ImageProps['src']
}

function Role({ role }: { role: Role }) {
  const role1 = role.role1
  let startLabel =
    typeof role1.start === 'string' ? role1.start : role1.start.label
  let startDate =
    typeof role1.start === 'string' ? role1.start : role1.start.dateTime

  let endLabel = typeof role1.end === 'string' ? role1.end : role1.end.label
  let endDate = typeof role1.end === 'string' ? role1.end : role1.end.dateTime

  const role2 = role.role2
  let startLabel2 =
    typeof role2?.start === 'string' ? role2?.start : role2?.start.label
  let startDate2 =
    typeof role2?.start === 'string' ? role2?.start : role2?.start.dateTime

  let endLabel2 = typeof role2?.end === 'string' ? role2?.end : role2?.end.label
  let endDate2 =
    typeof role2?.end === 'string' ? role2?.end : role2?.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        {role2 && (
          <div className="flex w-full justify-between">
            <dt className="sr-only">Role</dt>
            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
              {role2.title}
            </dd>
            <div className="text-left">
              <dt className="sr-only">Date</dt>
              <dd
                className="text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${startLabel2} until ${endLabel2}`}
              >
                <time dateTime={startDate2}>{startLabel2}</time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={endDate2}>{endLabel2}</time>
              </dd>
            </div>
          </div>
        )}
        <div className="flex w-full justify-between">
          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
            {role1.title}
          </dd>
          <div className="text-left">
            <dt className="sr-only">Date</dt>
            <dd
              className="text-xs text-zinc-400 dark:text-zinc-500"
              aria-label={`${startLabel} until ${endLabel}`}
            >
              <time dateTime={startDate}>{startLabel}</time>{' '}
              <span aria-hidden="true">—</span>{' '}
              <time dateTime={endDate}>{endLabel}</time>
            </dd>
          </div>
        </div>
      </dl>
    </li>
  )
}

const present = {
  label: 'Present',
  dateTime: new Date().getFullYear().toString(),
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Henry Meds',
      role1: {
        title: 'Sr. Software Engineer',
        start: 'Jun 2024',
        end: 'Jun 2025',
      },
      role2: {
        title: 'Engineering Manager',
        start: 'Jun 2025',
        end: present,
      },
      logo: logoHenryMeds,
    },
    {
      company: 'Blueboard',
      role1: {
        title: 'Software Engineer',
        start: 'Jun 2019',
        end: 'Mar 2024',
      },
      logo: logoBlueboard,
    },
    {
      company: 'MK Dev',
      role1: {
        title: 'Web Developer',
        start: 'Dec 2017',
        end: 'Jun 2019',
      },
      logo: logoMKDev,
    },
    {
      company: 'Wayfair',
      role1: {
        title: 'Software Engineer',
        start: 'Aug 2017',
        end: 'Dec 2017',
      },
      logo: logoWayfair,
    },
  ]

  interface StatusTags {
    [key: string]: {
      color: string
      label: string
    }
  }

  const statusTags: StatusTags = {
    LOOKING: {
      color: 'bg-green-500/10 text-green-400 ring-green-500/20',
      label: 'Currently Interviewing',
    },
    OPEN: {
      color: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
      label: 'Open to New Opportunities',
    },
    '!OPEN': {
      color: 'bg-red-500/10 text-red-400 ring-red-500/20',
      label: 'Not Looking for Work',
    },
  }

  const currentStatus: string = process.env.CURRENT_STATUS || '!OPEN'

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex items-center justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <div className="flex">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work</span>
        </div>
        <div>
          <span
            className={`${statusTags[currentStatus].color} ml-3 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`}
          >
            {statusTags[currentStatus].label}
          </span>
        </div>
      </h2>
      <h3 className="flex items-baseline text-sm font-semibold text-zinc-900 dark:text-zinc-100"></h3>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        href={process.env.RESUME_URL}
        download="Mario-Kennedy-Kavouras-Software Engineer.pdf"
        target="_blank"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 2)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="h-[115px] text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software Engineer, Chef,{' '}
            <TypingAnimation variations={homeTextVariations} />
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Mario, a Software Engineer based in San Diego, CA.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/k0iram"
              target="_blank"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/mariokk"
              target="_blank"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://www.instagram.com/koiram"
              target="_blank"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://x.com/k0iram"
              target="_blank"
              aria-label="Follow on X"
              icon={TwitterIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
              Ask Me Anything
            </h2>
            <h5 className="pb-4">
              Have questions about me? Ask my AI bot anything you want to know!
            </h5>
            <Chat />
          </div>
          <div className="flex flex-col gap-16">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
              Musings
            </h2>
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
            <Link
              href="/articles"
              passHref
              className="flex items-center text-sm font-medium text-teal-500"
            >
              View all articles
              <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
            </Link>
          </div>
          <div className="space-y-10">
            <Resume />
            <Newsletter />
          </div>
        </div>
      </Container>
    </>
  )
}
