import React from 'react';
import {
    Image,
    Text, 
    View 
} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'

import Discord from '../../assets/discord.png'
import estilo from './styles';

type Props = RectButtonProps & {
    title: string;
}

export function ButtonIcon({title, ...rest} : Props){
    return(
        <RectButton 
            {...rest}
            style={estilo.container}>
            <View style={estilo.iconWrapper}>
                <Image source={Discord} style={estilo.icon}/>
            </View>

            <Text style={estilo.title}>
                {title}
            </Text>
        </RectButton>
    )
}