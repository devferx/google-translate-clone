import { useReducer } from 'react'

import type { State, ActionTypes } from './types'

import './App.css'

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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fromLanguage, fromText, isLoading, result, toLanguage } = state

  return (
    <div className='App'>
      <h1>Google Translate</h1>
      <button
        onClick={() => {
          dispatch({ type: 'SET_FROM_LANGUAGE', payload: 'es' })
        }}
      >
        Cambiar a Español
      </button>
    </div>
  )
}

export default App
