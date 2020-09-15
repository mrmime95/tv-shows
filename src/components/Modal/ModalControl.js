import React, { useState, cloneElement } from 'react';
import useKeyUp from '../../hooks/keyUp';
import Modal from './index';

const ESC_KEY = 27;

export default function ModalControl({ children, content, ...props }) {
  const [open, setOpen] = useState(false);
  useKeyUp(ESC_KEY, () => setOpen(false));

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} content={content({ close: () => setOpen(false) })} {...props} />
      {cloneElement(children, { onClick: () => setOpen(true) })}
    </>
  );
}
