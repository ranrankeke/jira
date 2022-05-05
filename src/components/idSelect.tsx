import React from 'react'
import { Raw} from '../types'
import { Select } from 'antd'

type SelectProps = React.ComponentProps<typeof Select>
//IdSelectProps继承Select自带的属性，但是有属性冲突，用Omit type 来处理，删除自带属性中 包含自定属性的部分
interface IdSelectProps extends Omit<SelectProps,'value' | 'onChange' | 'defaultOptionName' | 'options'>{ 
  value: Raw | undefined | null,
  onChange: (value?:number) => void,
  defaultOptionName?: string,
  options?:{ name: string, id: string}[]
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps} = props;
  return <Select
    value = {toNumber(value)}
    onChange = { value => onChange(toNumber(value) || undefined)}
    {...restProps}
  >
    { 
      defaultOptionName? <Select.Option value={0}> {defaultOptionName} </Select.Option> : null
    }
    {
      options?.map((option) => <Select.Option value={option.id} key={option.id} >{option.name}</Select.Option>)
    }

    
  </Select>

}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
console.log(toNumber)