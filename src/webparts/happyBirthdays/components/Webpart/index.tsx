import * as React from 'react';
import './Webpart.css';
import { User } from './../../types';
import Icon from './Icon';
import Item from './Item';
import useModal from '../../hooks/useModal';
import useConfig from '../../hooks/useConfig';
import * as moment from 'moment';
interface Props {
  currentUser?: User;
}
function Webpart({ currentUser }: Props) {
  const { showable, handleShow, handleHide } = useModal();
  const { isLoading, fail, birthdays } = useConfig();

  if (isLoading) return <h2>Cargando...</h2>;
  if (fail) return <h2>Error: {fail}</h2>;

  //  cumples de hoy
  const birthdayToday = birthdays.filter(i => {
    return moment().format('DDMM') === moment(i.birthday).format('DDMM');
  });

  //  cumples siguientes
  const nextBirthday = birthdays.filter(i => {
    return moment().format('DDMM') !== moment(i.birthday).format('DDMM');
  });

  return (
    <>
      <div onClick={handleShow} className="webpart">
        <img
          src="https://png.pngtree.com/element_our/md/20180620/md_5b2a9d4b5a062.jpg"
          alt="happy birthday"
          className="webpart__banner"
        />
      </div>
      <div className={`webpart-modal${showable ? ' show' : ''}`}>
        <div className="webpart-modal__body">
          <Icon onHide={handleHide} size={35} color="hsl(0, 50%, 50%)" />
          <h2>¡Cumpleañeros del Mes!</h2>
          <div className="webpart__birthdays">
            <h3>Hoy</h3>
            <div className="webpart__items">
              {birthdayToday.map(x => (
                <Item person={x.person} date={x.birthday} selectable />
              ))}
            </div>

            <h3>Siguientes</h3>
            <div className="webpart__items">
              {nextBirthday.map(x => (
                <Item person={x.person} date={x.birthday} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Webpart;
