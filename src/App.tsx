import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row } from 'react-bootstrap'

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
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <LanguageSelector
            type='from'
            value={fromLanguage}
            onChange={setFromLanguage}
          />
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
        <Col>
          <LanguageSelector
            type='to'
            value={toLanguage}
            onChange={setToLanguage}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
