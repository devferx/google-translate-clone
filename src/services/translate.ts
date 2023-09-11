import NLPCloudClient from 'nlpcloud'

import { type Langugage, type FromLanguage } from '../hooks/useStore.types'

const apiKey = import.meta.env.VITE_NLP_API_KEY
const client = new NLPCloudClient('nllb-200-3-3b', apiKey, false)

interface TranslateParams {
  fromLanguage: FromLanguage
  toLanguage: Langugage
  text: string
}

export interface NPLCloudTranslateResponse {
  translation_text: string
}

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: TranslateParams) {
  if (fromLanguage === toLanguage) return text

  try {
    const res = await client.translation(
      text,
      fromLanguage !== 'auto' ? fromLanguage : '',
      toLanguage
    )

    return res.data.translation_text
  } catch (error) {
    console.error(error)
    return 'Error'
  }
}
