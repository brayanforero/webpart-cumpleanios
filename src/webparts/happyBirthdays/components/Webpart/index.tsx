import * as React from 'react';
import './Webpart.css';
import { User } from './../../types';
import Icon from './Icon';
import Item from './Item';
// import { Web } from 'sp-pnp-js/lib/sharepoint/webs';
import useModal from '../../hooks/useModal';
import useConfig from '../../hooks/useConfig';
interface Props {
  currentUser?: User;
}
function Webpart({ currentUser }: Props) {
  const { showable, handleShow, handleHide } = useModal();
  const { isLoading, ifFail, configuration } = useConfig();

  if (isLoading) return <h2>Cargando...</h2>;
  // if (ifFail) return <h2>Error: {ifFail}</h2>;

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
          <h2>Cumpleañeros del Mes</h2>
          <div className="webpart__birthdays">
            <h3>Hoy</h3>
            <div className="webpart__items"></div>
            <h3>Siguientes</h3>
            <div className="webpart__items"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Webpart;
