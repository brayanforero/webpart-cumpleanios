import * as React from 'react';
// import { Birthday } from './../../types';

interface Props {
  background: string;
}

function Form({ background }: Props) {
  return (
    <section
      style={{
        backgroundImage: `url("${background}")`,
      }}
      className="webpart-modal__form"
    >
      <form>
        <h3>¡Expresa tu mejores Deseseos!</h3>
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message"></textarea>
        <label htmlFor="url">Url de la Imagen</label>
        <input type="url" name="url" id="url"></input>
        <button type="submit">Enviar</button>
        <button type="button">Cancelar</button>
      </form>
      <div></div>
    </section>
  );
}

export default Form;
