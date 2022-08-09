import { collection, CollectionReference, getDocs } from "firebase/firestore";
import { Firestore, getFirestore, where, query } from "firebase/firestore";
import { Verse, VerseNumber } from '@/domain/models/verse'

interface DbVerse {
  langId: string
  number: {
    bookId: string
    numbers: string[]
  }
  text: string
  translation: string
}


export class VersesRepository {
  private db: Firestore
  private collection: CollectionReference

  constructor() {
    this.db = getFirestore()
    this.collection = collection(this.db, "verses")
  }

  async load(lang: string): Promise<Verse[]> {
    const q = query(this.collection, where("langId", "==", lang))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((x) => {
      return this.map(x.id, x.data() as DbVerse)
    })
  }

  private map(id: string, data: DbVerse): Verse {
    return new Verse(
      id, new VerseNumber(data.number.bookId, data.number.numbers),
      data.text, data.translation, data.langId
    )
  }
}
