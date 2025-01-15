import React from 'react';

function TextInput({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

function CheckboxInput({ checked, onChange }) {
  return <input type="checkbox" checked={checked} onChange={onChange} />;
}

export function useInputFactory(type, props) {
  switch (type) {
    case 'text':
      return <TextInput {...props} />;
    case 'checkbox':
      return <CheckboxInput {...props} />;
    default:
      throw new Error(`Tipo de entrada desconhecido: ${type}`);
  }
}