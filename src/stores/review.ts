import { defineStore } from 'pinia'

export type ReviewCard = {
  id: string,
  verseId: string,
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
    addCard(verseId: string) {
      const id = (Math.random() + 1).toString(36).substring(7);
      this.cards.push({ id, verseId })
    },
  },
  getters: {
    readyForReview(): ReviewCard[] {
      return this.cards
    }
  }
})