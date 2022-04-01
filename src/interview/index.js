import React, { useState, useEffect } from 'react'
//import { Modal } from 'antd'
import { Modal } from './modal';
import 'antd/dist/antd.css';
export function UseNotificationSign11Dialog() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (new Date().getTime() - localStorage.getItem('cancelTime') > 24 * 60 * 60) {
      setVisible(true)
    }
  }, [])

  function onOk() {
    window.location = 'https://tmall.com/sign-11-protocol'
  }

  function onCancel() {
    setVisible(false);
    const now = new Date().getTime();
    localStorage.setItem('cancelTime', now);
  }


  return (<Modal title='双11签约' visible={visible} onOk={onOk} onCancel={onCancel}>
    <div>111</div>
  </Modal>)


}

