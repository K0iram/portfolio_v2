import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import TypingAnimation from '@/components/TypingAnimation'
import { aboutTextVariations } from '../enums'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target='_blank'
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Mario Kavouras. I live in Boston, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl h-[250px]">
            I’m Mario Kavouras. I live in Boston, where I <TypingAnimation variations={aboutTextVariations} />
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              {`In my portfolio, you'll find a blend of tech innovation and a laid-back lifestyle that captures my essence. Life for me is about striking a balance—navigating the tech world with the same enthusiasm I share with my wife, Erin, and our three kids, Nixon, Bowie, and Ollie, in our homes in Boston and San Diego. Our journey, enriched by our kids' laughter and our dog Carmy's loyalty, is a testament to finding joy in both the hustle of the city and the calm of the coast.`}
            </p>
            <p>
              {`Before diving into the tech scene, I lived a different kind of adventure in Mykonos, Greece, running the family's boutique hotel, Grecophilia. Those years were a crash course in hospitality and creating unforgettable experiences, all under the Mediterranean sun. It's where Erin and I's story began, blending personal growth with professional hustle. Fast forward to 2017, I pivoted to tech, embracing the coding world with open arms in Boston's North End, and I've been riding that wave ever since.`}
            </p>
            <p>
              {`Off the clock, my passions are as diverse as my career path. From culinary experiments, thanks to my culinary school days, to embracing the outdoors—catching a wave, hitting the slopes, or enjoying a quiet day fishing. These activities keep me grounded and inspire my work in tech, adding a splash of creativity and innovation to every project. This mix of tech drive and a penchant for simple pleasures keeps me moving forward, always with an eye for the next adventure.`}
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://www.instagram.com/koiram/" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://www.github.com/k0iram" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/mariokk/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:mario@sick.email"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              mario@sick.email
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
