import { useReducer } from 'react'
import type {
  State,
  ActionTypes,
  Langugage,
  FromLanguage
} from './useStore.types'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  isLoading: false
}

function reducer(state: State, action: ActionTypes): State {
  switch (action.type) {
    case 'INTERCHANGE_LANGUAGES':
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    case 'SET_FROM_LANGUAGE':
      return {
        ...state,
        fromLanguage: action.payload
      }
    case 'SET_TO_LANGUAGE':
      return {
        ...state,
        toLanguage: action.payload
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

  const intercahngeLanguages = () => {
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

  return {
    ...state,
    intercahngeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText
  }
}
