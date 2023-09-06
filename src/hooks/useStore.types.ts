import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from '../constants'

export type Langugage = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Langugage | AutoLanguage

export interface State {
  fromLanguage: string
  toLanguage: string
  fromText: string
  result: string
  isLoading: boolean
}

export type ActionTypes =
  | {
      type: 'INTERCHANGE_LANGUAGES'
    }
  | { type: 'SET_FROM_LANGUAGE'; payload: string }
  | { type: 'SET_TO_LANGUAGE'; payload: string }
  | { type: 'SET_FROM_TEXT'; payload: string }
  | { type: 'SET_RESULT'; payload: string }
