import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { estilo } from './styles';

type Props = RectButtonProps & {
  title: string;
}

export function Button({ title, ...rest } : Props){
  return(
    <RectButton 
      style={estilo.container} 
      {...rest }
    >
      <Text style={estilo.title}>
        { title }
      </Text>
    </RectButton>
  );
}