import { defineStore } from 'pinia'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Verse } from '@/domain/models/verse';


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
    // async load() {
    //   const db = getFirestore()
    //   const querySnapshot = await getDocs(collection(db, "inbox"))
    //   this.cards = []
    //   querySnapshot.forEach((doc) => {
    //     const obj = {
    //       id: doc.id,
    //       type: doc.data().type,
    //       verseId: doc.data().verseId
    //     } as InboxCard
    //     this.cards.push(obj)
    //     console.log(obj)
    //     // console.log(`${doc.id} => doc.data()}`);
    //   })
    //   console.log(this.cards)
    // },
    addCard(type: InboxTypeCard, verse: Verse) {
      const r = (Math.random() + 1).toString(36).substring(7);

      this.cards.push({type, verseId: verse.id, id: r})
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