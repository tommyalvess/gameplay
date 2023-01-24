import React from 'react';
import {
    Image,
    Text, 
    TouchableOpacity, 
    TouchableOpacityProps, 
    View 
} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import estilo from './styles';
import { theme } from '../../global/styles/theme';


export function ButtonAdd({...rest} : RectButtonProps){
    return(
        <RectButton
        style={estilo.container}
        {...rest}
        >
            <MaterialCommunityIcons 
                name="plus"
                color={theme.colors.heading}
                size={24}
            />
           
        </RectButton>
    )
}