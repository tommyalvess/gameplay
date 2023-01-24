import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { estilo } from './style';

export function TextArea({...rest}: TextInputProps){
  return (
    <TextInput 
      style={estilo.container}
      {...rest}
    />
  );
}