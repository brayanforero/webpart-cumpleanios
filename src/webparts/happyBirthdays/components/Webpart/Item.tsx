import * as React from 'react';
const IMAGE =
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/happy-birthday-design-template-af838ab160d11b63fd74ccda06e4d075_screen.jpg?ts=1604808021';

interface Props {
  person: string;
  date: string;
  poster?: string;
}

function Item({ person, date }: Props) {
  return (
    <div className="item">
      <img src={IMAGE} alt="Happy Birthday Image" />
      <span>
        {person} - {date}
      </span>
      <button>Felicitar</button>
    </div>
  );
}

export default Item;
