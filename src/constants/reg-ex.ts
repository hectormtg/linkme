const REG_EX = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD: /((?=(.*\d){1,})(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[\W]){1,}).{8,})/g,
  NUMBER: /[0-9]/g,
  LINK: /((https?|ftp)\:\/\/([\w-]+\.)?([\w-])+\.(\w)+\/?[\w\?\.\=\&\-\#\+\/]+)/,
  LINK_PREFIX: /(https?|ftp):\/\/(w{0,3}\.)?/,
  SPECIAL_CHARS: /[^\w \xC0-\xFF]/g,
  CURRENCY: /[^\d.]/g,
  PHONE:
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{4})(?:[-.x ]*(\d+))?)\s*$/gm,
  WHITE_SPACES: /\s/g,
}

// const LINKS_REG_EX: Record<LinkType, string> = {
//   [LinkType.GITHUB]:
// }

export default REG_EX
