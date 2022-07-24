import { defineStore } from 'pinia'

export type InboxCard = {
    id: string,
    title: string
    content: string,
}

export type InboxState = {
    cards: InboxCard[]
}

export const useInboxStore = defineStore('inbox', {
  state: () => {
    return {
        cards: []
    } as InboxState
  },
  actions: {
    addCard(title: string, content: string) {
      const r = (Math.random() + 1).toString(36).substring(7);

      this.cards.push({title, content, id: r})
    },
    mark(id: string) {
      const idx = this.cards.findIndex(c => c.id === id)
      if (idx !== -1) { this.cards.splice(idx, 1) }
    }
  },
  getters: {
    isAllReviewdByVerse() {
      return (verse: string) => this.cards.filter(c => c.title === verse).length === 0
    },
    isEmpty(): boolean {
      return this.cards.length === 0
    },
    readyForReview(): InboxCard[] {
      return this.cards
    }
  }
})