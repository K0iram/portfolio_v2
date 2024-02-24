import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

import logoBooks from '@/images/logos/bookshelf.png'
import logoBlueboard from '@/images/logos/blueboard.svg'
import logoP2P from '@/images/logos/P2P.png'
import logoWayfair from '@/images/logos/wayfair.png'
import logoBbLounge from '@/images/logos/bb-lounge.png'

const projects = [
  {
    name: 'Blueboard',
    description:
      'As part of the product engineering team, I helped build the next generation of the Blueboard platform. We used a modern tech stack to build a scalable and reliable platform that powers the employee rewards and recognition programs for some of the world’s most innovative companies.',
    link: { href: 'http://blueboard.com', label: 'blueboard.com' },
    logo: logoBlueboard,
  },
  {
    name: 'Peer to Peer',
    description:
      'As the lead engineer, I built the P2P platform from the ground up. It’s a peer-to-peer recognition platform that allows employees to recognize each other for their hard work and dedication. It’s a great way to build a positive company culture and keep employees engaged.',
    link: { href: 'https://p2p.blueboard.com', label: 'p2p.blueboard.com' },
    logo: logoP2P,
  },
  {
    name: 'Ideaboards',
    description:
      'As part of the Storefront team, I helped build the Ideaboards feature. It’s a way for customers to save their favorite products and share them with friends and family. It’s a great way to keep track of products you love and get feedback from others.',
    link: { href: 'https://wayfair.com', label: 'wayfair.com' },
    logo: logoWayfair,
  },
  {
    name: 'Barbershop Lounge',
    description:
      'As a freelance web developer, I built the Barbershop Lounge website. It’s a modern and stylish website that showcases the barbershop’s services and allows customers to book appointments online.',
    link: { href: 'https://barbershoplounge.com', label: 'barbershoplounge.com' },
    logo: logoBbLounge,
  },
  {
    name: 'My Reads',
    description:
      `As the final project for the Udacity React Nanodegree, I built the My Reads app. It’s a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. It's a great example of how to leverage modern React and Redux.`,
    link: { href: 'https://github.com/K0iram/myreads-app', label: 'github.com' },
    logo: logoBooks,
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve worked on trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve worked on trying to put my dent in the universe."
      intro="I’ve worked on tons of projects over the years but these are the ones that I’m most proud of. They’re the ones that I think have made the biggest impact and have helped me grow the most as an engineer."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href} target="_blank">{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
