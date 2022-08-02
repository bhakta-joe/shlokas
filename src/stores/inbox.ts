import { defineStore } from 'pinia'

export enum InboxTypeCard {
  text,
  transaltion
}

export type InboxCard = {
    id: string,
    type: InboxTypeCard,
    verseId: string
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
    addCard(type: InboxTypeCard, verseId: string) {
      const r = (Math.random() + 1).toString(36).substring(7);

      this.cards.push({type, verseId, id: r})
    },
    mark(id: string) {
      const idx = this.cards.findIndex(c => c.id === id)
      if (idx !== -1) { this.cards.splice(idx, 1) }
    }
  },
  getters: {
    isAllReviewdByVerse() {
      return (verseId: string) => this.cards.filter(c => c.verseId === verseId).length === 0
    },
    isEmpty(): boolean {
      return this.cards.length === 0
    },
    readyForReview(): InboxCard[] {
      return this.cards
    }
  }
})