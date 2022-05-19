import * as React from 'react';
import { Birthday } from './../../types';
import './Webpart.css';
interface Props {
  background: string;
  birthdaySelected: Birthday;
  onCancel: CallableFunction;
}

interface FormState {
  message: {
    text: string;
    url: string;
  };
}

const INITIAL_MESSAGE = {
  text: '',
  url: '',
};

function Form({ background, birthdaySelected, onCancel }: Props) {
  const [message, setMessage] =
    React.useState<FormState['message']>(INITIAL_MESSAGE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ message, birthdaySelected });

    reset();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const reset = () => {
    setMessage(INITIAL_MESSAGE);
  };

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
        <textarea onChange={handleChange} name="text" id="text">
          {message.text}
        </textarea>
        <label htmlFor="url">Url de la Imagen:</label>
        <input
          onChange={handleChange}
          type="url"
          name="url"
          id="url"
          value={message.url}
        ></input>
        <button type="submit">Enviar</button>
        <button
          onClick={() => {
            onCancel();
            reset();
          }}
          type="button"
        >
          Cancelar
        </button>
      </form>
      {/* <div></div> */}
    </section>
  );
}

export default Form;
