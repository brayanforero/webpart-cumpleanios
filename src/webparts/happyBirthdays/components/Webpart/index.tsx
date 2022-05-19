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
  const [itemSelected, setItemSelected] = React.useState<Birthday | null>(null);

  const handleSelectedItem = React.useCallback(
    (i: Birthday) => {
      setItemSelected(i);
    },
    [setItemSelected]
  );

  const handleunSelectedItem = React.useCallback(() => {
    setItemSelected(null);
  }, [setItemSelected]);

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
      <section onClick={handleShow} className="webpart">
        <img
          src={settings.mainImage}
          alt="happy birthday"
          className="webpart__banner"
        />
      </section>
      <section className={`webpart-modal${showable ? ' show' : ''}`}>
        <div
          style={{
            backgroundImage: `url("${settings.backgroundCard}")`,
          }}
          className="webpart-modal__body"
        >
          <Icon onHide={handleHide} size={35} color="hsl(0, 50%, 50%)" />
          <h2>¡Cumpleañeros del Mes!</h2>
          <div className="webpart__birthdays">
            {birthdayToday.length > 0 && (
              <>
                <h3>Hoy</h3>
                <div className="webpart__items">
                  {birthdayToday.map(b => (
                    <Item
                      person={b.person}
                      poster={settings.currentBirthdayImage}
                      date={b.birthday}
                      email={b.email}
                      selectable
                      onSelect={handleSelectedItem}
                    />
                  ))}
                </div>
              </>
            )}

            {nextBirthday.length > 0 && (
              <>
                <h3>Siguientes</h3>
                <div className="webpart__items">
                  {nextBirthday.map(b => (
                    <Item
                      person={b.person}
                      poster={settings.nextBirthdayImage}
                      date={b.birthday}
                      email={b.email}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <Form
            background={settings.backgroundCard}
            birthdaySelected={itemSelected}
            onCancel={handleunSelectedItem}
          />
        </div>
      </section>
    </>
  );
}

export default Webpart;
