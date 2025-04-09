export type User = {
  email: string,
  id: string
  password?: string;
}

export type LogIn = {
  accessToken: string,
  user: User
}