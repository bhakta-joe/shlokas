import { defineStore } from 'pinia'
import { VersesRepository } from '@/services/data/verses'
import { Verse } from '@/domain/models/verse'

type VersesState = {
  verses: Verse[],
}

export const useVersesStore = defineStore('verses', {
  state: () => {
    return {
      verses: [],
    } as VersesState
  },
  actions: {
    async load() {
      console.log("loading...")
      this.verses = await new VersesRepository().load("ru")
    },
  },
  getters: {
    all() : Verse[] { return this.verses as Verse[] },
    byId() {
      return (id: string) => this.verses.find(x => x.id == id)
    }
  }
})