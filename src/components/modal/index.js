import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./style.scss";

function Modal({ children, isOpen, handleClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <div className="modal-close-btn">
          <AiOutlineClose onClick={handleClose} className="icon" />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
