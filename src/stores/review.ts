import { defineStore } from 'pinia'

export type ReviewCard = {
  id: string,
  verseId: string,
  type: string,
  reviewDate: Date
}

export type ReviewState = {
    cards: ReviewCard[]
}

export const useReviewStore = defineStore('review', {
  state: () => {
    return {
        cards: []
    } as ReviewState
  },
  actions: {
    addCard(verseId: string, type: string) {
      const id = (Math.random() + 1).toString(36).substring(7);
      this.cards.push({ id, verseId, type, reviewDate: new Date() })
    },
    markReviewed() {
      const current = this.readyForReview[0]
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      current.reviewDate = tomorrow
    }
  },
  getters: {
    readyForReview(): ReviewCard[] {
      const now = new Date()
      return this.cards.filter(x => now > x.reviewDate)
    }
  }
})