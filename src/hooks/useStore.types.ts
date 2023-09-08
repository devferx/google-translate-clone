import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from '../constants'

export type Langugage = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Langugage | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Langugage
  fromText: string
  result: string
  isLoading: boolean
}

export type ActionTypes =
  | {
      type: 'INTERCHANGE_LANGUAGES'
    }
  | { type: 'SET_FROM_LANGUAGE'; payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE'; payload: Langugage }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }

export enum SectionType {
  From = 'from',
  To = 'to'
}
