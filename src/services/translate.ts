import { GoogleGenerativeAI } from '@google/generative-ai'

import { type Langugage, type FromLanguage } from '../hooks/useStore.types'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({
  model: 'gemini-pro'
})

interface TranslateParams {
  fromLanguage: FromLanguage
  toLanguage: Langugage
  text: string
}

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: TranslateParams): Promise<string> {
  if (fromLanguage === toLanguage) return text

  const prompt = `Translate the following text from ${fromLanguage} to ${toLanguage}:\n\n${text}\n\nTranslation:`

  try {
    const { response } = await model.generateContent(prompt)

    return response.text()
  } catch (error) {
    console.error(error)
    return 'Error'
  }
}
