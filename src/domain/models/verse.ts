export class VerseNumber {
  private _bookId: string
  private _numbers: string[]

  constructor(bookId: string, numbers: string[]) {
    this._bookId = bookId
    this._numbers = numbers
  }

  get title(): string {
    const numbers = this._numbers.join('.')
    return `${this._bookId} ${numbers}`.toUpperCase()
  }
}

export class Verse {
  private _id: string
  private _langId: string
  private _text: string
  private _translation: string
  private _verseNumber: VerseNumber

  constructor(
    id: string,
    number: VerseNumber,
    text: string,
    translation: string,
    langId: string
  ) {
    this._id = id
    this._verseNumber = number
    this._text = text
    this._translation = translation
    this._langId = langId
  }

  get id(): string { return this._id }
  get number(): VerseNumber { return this._verseNumber }
  get text(): string { return this._text }
  get translation(): string { return this._translation }
}
