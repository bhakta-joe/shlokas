import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useTimeStore } from './time'

export type ReviewCard = {
  id: string
  verseId: string
  type: string
  reviewDate: Date
  ease: number
}

export type ReviewState = {
    cards: ReviewCard[]
}

export const useReviewStore = defineStore('review', {
  state: () => {
    return {
        cards: [],
    } as ReviewState
  },
  actions: {
    addCard(verseId: string, type: string) {
      const id = (Math.random() + 1).toString(36).substring(7);
      this.cards.push(reactive({
        id, verseId, type, reviewDate: new Date(), ease: 120
      }))
    },
    // markReviewed() {
    //   const current = this.readyForReview[0]
    //   const tomorrow = new Date()
    //   tomorrow.setDate(tomorrow.getDate() + 1)
    //   current.reviewDate = tomorrow
    // }
  },
  getters: {
    readyForReview(): ReviewCard[] {
      const timeStore = useTimeStore()

      function toDate(x: Date) : Date {
        return new Date(new Date(x).setHours(0, 0, 0, 0))
      }


      return this.cards.filter(x => timeStore.date >= toDate(x.reviewDate))
    }
  }
})