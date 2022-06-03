import * as React from 'react'
import { sendMessage } from '../../services/webpartServices'
import { Birthday } from './../../types'
import Swal from 'sweetalert2'
import './Webpart.css'
import useForm from '../../hooks/useForm'
import { CONTEXT } from '../../context/global'
interface Props {
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

function Form({ birthdaySelected, onCancel }: Props) {
  const [message, setMessage] =
    React.useState<FormState['message']>(INITIAL_MESSAGE)
  const [loading, setLoading] = React.useState(false)
  const { config, gallery } = React.useContext(CONTEXT)

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
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Tu me mensaje se ha enviado!',
        })
      })
      .catch(({ status, data }) => {
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: `Ops... ${status}`,
          text: `Error: ${data.responseBody['odata.error'].message.value}`,
        })
        console.log(data)
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
        backgroundImage: `url("${config.backgroundCard}")`,
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
      <div className="webpart-modal__gallery">
        {gallery.map(i => (
          <img
            width={120}
            height={120}
            src={i.url}
            alt="Happy birthdya images"
          />
        ))}
      </div>
    </section>
  )
}

export default Form
