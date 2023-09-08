import { useStore } from './hooks/useStore'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'

import { SectionType } from './hooks/useStore.types'

import { InterchangeIcon } from './components/icons'
import { LanguageSelector } from './components/laguage-selector'

import { AUTO_LANGUAGE } from './constants'

import './App.css'

function App() {
  const {
    fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage
  } = useStore()

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
            <Form.Control
              as='textarea'
              placeholder='Introducir texto'
              autoFocus
              style={{ height: '150px' }}
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
            <Form.Control
              as='textarea'
              placeholder='Traducción'
              style={{ height: '150px' }}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
