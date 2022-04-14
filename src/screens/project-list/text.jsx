import React, { useState } from 'react';

export default function Test(props) {
  const { maxLength, defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  const [inputLength, setInputLength] = useState(0);
  const handleChange = e => {
    setValue(e.target.value);
    setInputLength(e.target.value.length);
  };
  return (
    <div>
      <div style={{ border: '1px solid #999', width: '280px', display: 'flex', justifyContent: 'space-between' }}>
        <input
          style={{ outline: 'none', border: '0px' }}
          defaultValue={value}
          placeholder="请输入想要说的话"
          maxLength={maxLength}
          onChange={handleChange}
        ></input>
        <div>{`${inputLength}/${maxLength}`}</div>
      </div>
    </div>
  );
}