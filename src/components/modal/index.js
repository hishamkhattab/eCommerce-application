import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import "./style.scss";

function Modal({ children, closeModal }) {
  return (
    <div className="modal-details">
      <div className="modal-container">
        <button className="close" onClick={() => closeModal(false)}>
          <AiOutlineClose />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
