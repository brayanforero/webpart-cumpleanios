import * as React from 'react';

import * as moment from 'moment';
interface Props {
  person: string;
  email: string;
  date: Date;
  poster: string;
  selectable?: boolean;
  onSelect?: CallableFunction;
}

function Item({
  person,
  date,
  poster,
  email,
  onSelect,
  selectable = false,
}: Props) {
  const handleSelect = React.useCallback(() => {
    onSelect({
      person,
      date,
      poster,
      email,
    });
  }, [person, poster, email]);

  return (
    <div className="item">
      <img src={poster} alt="Happy Birthday Image" />
      <span>
        {person} <br />
        {moment(date).format('DD MMM')}
      </span>

      {selectable && <button onClick={handleSelect}>Felicitar</button>}
    </div>
  );
}

export default Item;
