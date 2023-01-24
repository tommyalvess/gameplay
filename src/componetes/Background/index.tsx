import React, { ReactNode } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import { estilo } from './styles';
import { theme } from '../../global/styles/theme';

type Props = {
    children: ReactNode
}

export function Background({children}:Props) {

    const {secondary80,secondary100} = theme.colors;

    return(
        <LinearGradient
            style={estilo.container}
            colors={[secondary80,secondary100]}
        >
            {children}
        </LinearGradient>
    )
}