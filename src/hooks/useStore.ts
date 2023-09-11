import { useReducer } from 'react'

import type {
  State,
  ActionTypes,
  Langugage,
  FromLanguage
} from './useStore.types'
import { AUTO_LANGUAGE } from '../constants'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'eng_Latn',
  fromText: '',
  result: '',
  isLoading: false
}

function reducer(state: State, action: ActionTypes): State {
  switch (action.type) {
    case 'INTERCHANGE_LANGUAGES':
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      return {
        ...state,
        isLoading: state.fromText !== '',
        result: '',
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    case 'SET_FROM_LANGUAGE':
      if (state.fromLanguage === action.payload) return state

      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        isLoading: state.fromText !== ''
      }
    case 'SET_TO_LANGUAGE':
      if (state.fromLanguage === action.payload) return state

      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        isLoading: state.fromText !== ''
      }
    case 'SET_FROM_TEXT':
      return {
        ...state,
        isLoading: true,
        fromText: action.payload,
        result: ''
      }
    case 'SET_RESULT':
      return {
        ...state,
        isLoading: false,
        result: action.payload
      }
    default:
      return state
  }
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Langugage) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    ...state,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
