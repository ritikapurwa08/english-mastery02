
export interface wordInterface {
  wordNo:number,
  word:string,
  meaning:string,
  hindiMeaning:string,
  status:"new" | "known" | "marked"
}

export const wordList : wordInterface[] = [
  {
    wordNo:1,
    word:"apple",
    meaning:"a fruit",
    hindiMeaning:"सेव",
    status:"new"

  }
];
interface synonymsInterface {
  wordNo:number,
  word:string,
  meaning:string,
  hindiMeaning:string,
  status:"new" | "known" | "marked"
  synonyms:string[],
}
export const synonymsList : synonymsInterface[] = [
  {
    wordNo:1,
    word:"apple",
    meaning:"a fruit",
    hindiMeaning:"सेव",
    status:"new",
  synonyms:["apple", "appletwo"]

  }
];

interface antonymsInterface {
  wordNo:number,
  word:string,
  meaning:string,
  hindiMeaning:string,
  status:"new" | "known" | "marked"
  antonyms:string,
}

export const antonymsList : antonymsInterface[] = [
  {
    wordNo:1,
    word:"apple",
    meaning:"a fruit",
    hindiMeaning:"सेव",
    status:"new",
    antonyms:"apple"

  }
];

interface phrasalVerbsInterface {
  wordNo:number,
  word:string,
  meaning:string,
  hindiMeaning:string,
  status:"new" | "known" | "marked"
  realtedWords:string[],
}

export const phrasalVerbsList : phrasalVerbsInterface[] = [
  {
    wordNo:1,
    word:"apple",
    meaning:"a fruit",
    hindiMeaning:"सेव",
    status:"new",
    realtedWords:["apple", "appletwo"]

  }
];

interface idiomsInterface {
  wordNo:number,
  word:string,
  meaning:string,
  hindiMeaning:string,
  status:"new" | "known" | "marked"
  realtedWords:string[],
}

export const idiomsList : idiomsInterface[] = [
  {
    wordNo:1,
    word:"apple",
    meaning:"a fruit",
    hindiMeaning:"सेव",
    status:"new",
    realtedWords:["apple", "appletwo"]

  }
];

