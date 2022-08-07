import { defineStore } from 'pinia'

export type TimeStore = {
    currentTime: Date
    shiftDays: number
}

export const useTimeStore = defineStore('time', {
  state: () => {
    return {
      currentTime: new Date(),
      shiftDays: 0
    } as TimeStore
  },
  actions: {
    setNow() {
      const date = new Date()
      date.setDate(date.getDate() + this.shiftDays)

      this.currentTime = date
    },
  },
  getters: {
    now() : Date { return this.currentTime },
    date() : Date {
      const date = new Date(this.now)
      date.setHours(0, 0, 0, 0)
      return date
    }
  }
})