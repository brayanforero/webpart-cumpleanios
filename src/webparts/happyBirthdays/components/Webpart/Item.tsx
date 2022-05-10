import * as React from 'react';
const IMAGE =
  'https://images.unsplash.com/photo-1575310866542-778bdb501c4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80';
import * as moment from 'moment';
interface Props {
  person: string;
  date?: Date;
  poster?: string;
}

function Item({ person, date }: Props) {
  return (
    <div className="item">
      <img src={IMAGE} alt="Happy Birthday Image" />
      <span>
        {person} <br />
        {moment(date).format('DD MMM')}
      </span>

      <button>Felicitar</button>
    </div>
  );
}

export default Item;
