import * as React from 'react';
import { Birthday } from './../../types';
import './Webpart.css';
interface Props {
  background: string;
  birthdaySelected?: Birthday;
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

    console.log('SUBMIT');
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
          ¡Expresa tu mejores Deseseos
          {birthdaySelected && ` a ${birthdaySelected.person}`}!
        </h3>
        <label htmlFor="message">Mensaje:</label>
        <textarea name="message" id="message">
          {message.text}
        </textarea>
        <label htmlFor="url">Url de la Imagen:</label>
        <input type="url" name="url" id="url" value={message.url}></input>
        <button type="submit">Enviar</button>
        <button onClick={() => onCancel()} type="button">
          Cancelar
        </button>
      </form>
      {/* <div></div> */}
    </section>
  );
}

export default Form;
