import * as React from 'react'
import { sendMessage } from '../../services/webpartServices'
import { Birthday, Image } from './../../types'
import Swal from 'sweetalert2'
import './Webpart.css'
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
  const [imageSelected, setImageSelected] = React.useState<Image>(null)
  const { config, gallery } = React.useContext(CONTEXT)
  const elementRef = React.useRef<number>(0)
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
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Tu me mensaje se ha enviado!',
        })
        reset()
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
    elementRef.current = 0
    setMessage(INITIAL_MESSAGE)
    setImageSelected(null)
  }

  const handleSelect = (i: Image) => {
    elementRef.current = i.id
    setImageSelected(i)
    setMessage({ ...message, url: i.url })
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
            alt="Happy birthdya images"
            height={120}
            onClick={() => handleSelect(i)}
            src={i.url}
            width={120}
            className={i.id === elementRef.current ? 'selected' : ''}
          />
        ))}
      </div>
    </section>
  )
}

export default Form
