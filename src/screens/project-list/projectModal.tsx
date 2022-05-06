import React from 'react'
import { Drawer, Button } from 'antd'

export const ProjectModal = (props:{projectModalOpen:boolean,onClose:() => void}) => {
  return <Drawer onClose={props.onClose} visible = {props.projectModalOpen} width='100%'>
    <h1>projectModal</h1>
    <Button onClick = {props.onClose}>关闭</Button>
    </Drawer>
} 