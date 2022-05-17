import * as React from 'react';
import './Webpart.css';
import { Birthday, Config, User } from './../../types';
import Icon from './Icon';
import Item from './Item';
import useModal from '../../hooks/useModal';

import * as moment from 'moment';
import Form from './Form';
interface Props {
  currentUser?: User;
  settings: Config;
  birthdays: Birthday[];
}

function Webpart({ currentUser, settings, birthdays }: Props) {
  const { showable, handleShow, handleHide } = useModal();

  //  cumples de hoy
  const birthdayToday = birthdays.filter(i => {
    return moment().format('DDMM') === moment(i.birthday).format('DDMM');
  });

  //  cumples siguientes
  const nextBirthday = birthdays.filter(i => {
    return moment(i.birthday).format('DDMM') > moment().format('DDMM');
  });

  return (
    <>
      <div onClick={handleShow} className="webpart">
        <img
          src={settings.mainImage}
          alt="happy birthday"
          className="webpart__banner"
        />
      </div>
      <div className={`webpart-modal${showable ? ' show' : ''}`}>
        <div
          style={{ backgroundImage: `url("${settings.backgroundCard}")` }}
          className="webpart-modal__body"
        >
          <Icon onHide={handleHide} size={35} color="hsl(0, 50%, 50%)" />
          <h2>¡Cumpleañeros del Mes!</h2>
          <div className="webpart__birthdays">
            {birthdayToday.length > 0 && (
              <>
                <h3>Hoy</h3>
                <div className="webpart__items">
                  {birthdayToday.map(x => (
                    <Item
                      person={x.person}
                      poster={settings.currentBirthdayImage}
                      date={x.birthday}
                      selectable
                    />
                  ))}
                </div>
              </>
            )}

            {nextBirthday.length > 0 && (
              <>
                <h3>Siguientes</h3>
                <div className="webpart__items">
                  {nextBirthday.map(x => (
                    <Item
                      person={x.person}
                      poster={settings.nextBirthdayImage}
                      date={x.birthday}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <Form />
        </div>
      </div>
    </>
  );
}

export default Webpart;
