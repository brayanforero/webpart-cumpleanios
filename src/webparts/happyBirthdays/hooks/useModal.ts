import * as React from 'react';

const useModal = () => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    console.log('hide');
    setShow(false);
  };

  return {
    showable: show,
    handleShow,
    handleHide,
  };
};

export default useModal;
