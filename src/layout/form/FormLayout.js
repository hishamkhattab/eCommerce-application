import React from 'react'

import "./styles.scss";

const FormLayout = ({children,title}) => {
  return (
    <div className='form'>
      <div className="form-wrapper">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default FormLayout
