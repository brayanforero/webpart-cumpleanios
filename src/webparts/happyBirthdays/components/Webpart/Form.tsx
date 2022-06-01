import * as React from 'react'
import { sendMessage } from '../../services/webpartServices'
import { Birthday } from './../../types'
import './Webpart.css'
interface Props {
  background: string
  birthdaySelected: Birthday
  onCancel: CallableFunction
}

interface FormState {
  message: {
    text: string
    url: string
  }
}

const INITIAL_MESSAGE = {
  text: '',
  url: '',
}

function Form({ background, birthdaySelected, onCancel }: Props) {
  const [message, setMessage] =
    React.useState<FormState['message']>(INITIAL_MESSAGE)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageToSend = {
      Title: birthdaySelected.email,
      Message: message.text,
      UrlImage: message.url,
    }

    setLoading(true)
    sendMessage(messageToSend)
      .then(res => {
        setLoading(false)
        reset()
      })
      .catch(err => {
        setLoading(false)
        console.log({ ...err })
      })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }

  const reset = () => {
    setMessage(INITIAL_MESSAGE)
  }

  return (
    <section
      style={{
        backgroundImage: `url("${background}")`,
      }}
      className={`webpart-modal__form ${birthdaySelected ? 'show' : ''}`}
    >
      <form onSubmit={handleSubmit}>
        <h3>
          ¡Expresa tu mejores Deseos
          {birthdaySelected && ` a ${birthdaySelected.person}`}!
        </h3>

        <label htmlFor="text">Mensaje:</label>
        <textarea
          onChange={handleChange}
          name="text"
          id="text"
          value={message.text}
        />
        <label htmlFor="url">Url de la Imagen:</label>
        <input
          onChange={handleChange}
          type="url"
          name="url"
          id="url"
          value={message.url}
        />
        <button type="submit">{loading ? 'Enviando...' : 'Enviar'}</button>
        <button
          onClick={() => {
            onCancel()
            reset()
          }}
          type="button"
        >
          Cancelar
        </button>
      </form>
      {/* <div></div> */}
    </section>
  )
}

export default Form
