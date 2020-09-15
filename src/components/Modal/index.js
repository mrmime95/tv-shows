import React from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';

export default function Modal({ isOpen, title, headerContent, content, onClose = () => {}, ...props }) {
  if (!isOpen) {
    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: auto');
    return null;
  }

  document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden');
  return createPortal(
    <div className="outside" onClick={onClose} {...props}>
      <div className="modal-wrapper" onClick={e => e.stopPropagation()}>
        {title && (
          <div className="modal-title-container">
            <h4 className="modal-title">{title}</h4>
          </div>
        )}
        <div className="modal-content">{content}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
