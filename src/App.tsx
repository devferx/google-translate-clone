import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'

import { SectionType } from './hooks/useStore.types'

import { InterchangeIcon } from './components/icons'
import { LanguageSelector } from './components/laguage-selector'
import { TextArea } from './components/text-area'

import { AUTO_LANGUAGE } from './constants'

import './App.css'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    isLoading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  useEffect(() => {
    if (fromText.trim() === '') return
    translate({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result === null) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
  }, [fromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col xs='auto'>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />

            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col>
          <Button
            variant='light'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <InterchangeIcon height={24} width={24} />
          </Button>
        </Col>
        <Col xs='auto'>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              isLoading={isLoading}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
