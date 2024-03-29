import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

import "./style.scss";

function Modal({ children, closeModal }) {
  return createPortal(
    <div className="modal">
      <div className="modal-container">
        <button className="close" onClick={() => closeModal(false)}>
          <AiOutlineClose />
        </button>

        {children}
      </div>
    </div>,
    document.getElementById("modal-component")
  );
}

export default Modal;
