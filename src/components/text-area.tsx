import { Form } from 'react-bootstrap'
import { SectionType } from '../hooks/useStore.types'

interface TextAreaProps {
  type: SectionType
  isLoading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles: React.CSSProperties = {
  height: '200px',
  border: 0,
  resize: 'none'
}

interface GetPlaceholderParams {
  type: SectionType
  isLoading?: boolean
}

const getPlaceholder = ({ type, isLoading }: GetPlaceholderParams) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (isLoading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea = ({
  type,
  isLoading,
  value,
  onChange
}: TextAreaProps) => {
  const styles: React.CSSProperties =
    type === SectionType.From
      ? { ...commonStyles }
      : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      readOnly={type === SectionType.To}
      placeholder={getPlaceholder({ type, isLoading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}
