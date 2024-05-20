import { LINK_NAME, LinkType } from '@/types/link.type'
import { ReactNode } from 'react'
import FacebookIcon from '../../public/icons/FacebookIcon'
import GithubIcon from '../../public/icons/GithubIcon'
import YoutubeIcon from '../../public/icons/YoutubeIcon'

export const LINK_ICONS: Record<string, ReactNode> = {
  [LINK_NAME[LinkType.GITHUB]]: <GithubIcon />,
  [LINK_NAME[LinkType.FACEBOOK]]: <FacebookIcon />,
  [LINK_NAME[LinkType.YOUTUBE]]: <YoutubeIcon />,
}
