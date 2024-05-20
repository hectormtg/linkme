export interface User {
  id?: string | number
  name: string
  lastName: string
  email: string
  userName: string
  image?: string
}

export type SignupPayload = Pick<User, 'email' | 'userName'> & {
  password: string
}

export type LoginPayload = Pick<User, 'email'> & {
  password: string
}
