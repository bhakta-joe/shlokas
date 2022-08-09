
export interface IUser {
  get id(): string
  get name(): string
}

export interface ICredentials {
  username: string
  password: string
}

export type StateChanged = (user: IUser|null) => void

export interface IAuthService {
  signIn(credentials: ICredentials): void
  signUp(credentials: ICredentials): void
  get user() : IUser | null
  get stateChanged(): StateChanged
}