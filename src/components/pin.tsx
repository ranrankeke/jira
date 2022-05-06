import React from 'react'
import { Rate } from 'antd'

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean,
  onCheckChange?: (check:boolean) => void
}

export const Pin = (props:PinProps) => {
  const { checked, onCheckChange, ...resProps} = props

  return <Rate 
    count = {1}
    value = { checked ? 1 : 0}
    onChange = { num => onCheckChange?.(!!num) }
    {...resProps}
   />
}