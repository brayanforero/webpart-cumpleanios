import * as React from 'react';
import { Birthday } from './../../types';

function Form() {
  return (
    <form className="form">
      <div>
        <label htmlFor="message">Mensaje:</label>
        <textarea name="message" id="message" cols={30} rows={10}></textarea>
        <label htmlFor="url">URL de la Imagen:</label>
        <input type="text" name="url" id="url"></input>
        <button type="submit">Enviar</button>
        <button type="button">Cancelar</button>
      </div>
      <div></div>
    </form>
  );
}

export default Form;
