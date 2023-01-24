import React from "react";
import {LinearGradient} from 'expo-linear-gradient';

import {
    Image,
    Text, 
    View 
} from 'react-native';

import { estilo } from "./styles";
import { theme } from "../../global/styles/theme";

type Props = {
    urlsImage: string,
}

export function Avatar({urlsImage}: Props) {

    const {secondary50,secondary70} = theme.colors;

    console.log(urlsImage);
    

    return(
        <LinearGradient
            style={estilo.container}
            colors={[secondary50,secondary70]}
        >

            <Image
                source={{uri: urlsImage}}
                style={estilo.avatar}
            />

        </LinearGradient>
    )
}