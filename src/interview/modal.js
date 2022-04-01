import React from 'react'
import './style.css'
export const Modal = props => {
  const { title, onOk, onCancel, visible } = props;
  return (
    <div className={visible ? 'containerBlock' : 'containerNone'}>
      <div className='modal'>
        <div className='head'>
          <h3>{title}</h3>
        </div>
        <div className='content'>{props.children}</div>
        <div className='footer'>
          <div className='ok' onClick={onOk}>去签署</div>
          <div onClick={onCancel}>取消</div>
        </div>
      </div>
    </div>
  )

}
