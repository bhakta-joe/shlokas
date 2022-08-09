import { IAuthService } from '@/domain/services/auth';
import { IUser } from '@/domain/services/auth';
import { defineStore } from 'pinia'
import { AuthService } from '@/services/auth'

export type AuthState = {
  auth: IAuthService|undefined
  user: IUser|null
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      auth: undefined,
      user: null
    } as AuthState
  },
  actions: {
    init() {
      this.auth = new AuthService((user: IUser|null) => { this.user=user })
    },
    signIn() {
      this.auth?.signIn({ username: "a@a.com", password: "pwd123" })
    }
  },
  getters: {
    authenticatedUser(): IUser|null { return this.user }
  }
})