import * as React from 'react';

import * as moment from 'moment';
interface Props {
  person: string;
  date?: Date;
  poster?: string;
  selectable?: boolean;
}

function Item({ person, date, poster, selectable = false }: Props) {
  return (
    <div className="item">
      <img src={poster} alt="Happy Birthday Image" />
      <span>
        {person} <br />
        {moment(date).format('DD MMM')}
      </span>

      {selectable && <button>Felicitar</button>}
    </div>
  );
}

export default Item;
