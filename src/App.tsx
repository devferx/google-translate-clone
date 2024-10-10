import { useEffect } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'

import { translate } from './services/translate'

import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore'
import { SectionType } from './hooks/useStore.types'

import { ClipboardIcon, InterchangeIcon, SpeakerIcon } from './components/icons'
import { LanguageSelector } from './components/laguage-selector'
import { TextArea } from './components/text-area'

import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './constants'

import './App.css'

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

  const debouncedFromText = useDebounce(fromText)

  useEffect(() => {
    if (debouncedFromText.trim() === '') return
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result === null) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

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
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.To}
                value={result}
                isLoading={isLoading}
                onChange={setResult}
              />

              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  display: 'flex'
                }}
              >
                <Button variant='link' onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant='link' onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
