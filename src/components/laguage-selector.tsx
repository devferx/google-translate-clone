import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Langugage } from '../hooks/useStore.types'

type LanguageSelectorProps =
  | {
      type: 'from'
      value: FromLanguage
      onChange: (language: FromLanguage) => void
    }
  | {
      type: 'to'
      value: Langugage
      onChange: (language: Langugage) => void
    }

export const LanguageSelector = ({
  type,
  value,
  onChange
}: LanguageSelectorProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Langugage)
  }

  return (
    <Form.Select
      aria-label='Selecciona el idioma'
      value={value}
      onChange={handleChange}
    >
      {type === 'from' && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
