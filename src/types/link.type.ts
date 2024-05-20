export enum LinkType {
  GITHUB,
  YOUTUBE,
  FACEBOOK,
}

export const LINK_NAME: Record<LinkType, string> = {
  [LinkType.GITHUB]: 'Github',
  [LinkType.YOUTUBE]: 'YouTube',
  [LinkType.FACEBOOK]: 'Facebook',
}

export interface Link {
  name: string
  url: string
  type: LinkType
  id: number
}

export const LINK_TYPE_BY_NAME = {
  [LINK_NAME[LinkType.GITHUB]]: LinkType.GITHUB,
  [LINK_NAME[LinkType.YOUTUBE]]: LinkType.YOUTUBE,
  [LINK_NAME[LinkType.FACEBOOK]]: LinkType.FACEBOOK,
}

export type LinksList = Array<Link>
