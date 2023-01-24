import React from "react";

import {
    Image,
    Text, 
    View 
} from 'react-native';

import { estilo } from "./styles";

type Props = {
    title: string;
    subTitle: string;
}

export function ListHeader({title,subTitle}: Props) {

    return(
        <View
            style={estilo.container}
        >
            <Text style={estilo.title}>
                {title}
            </Text>

            <Text style={estilo.subTitle}>
                {subTitle}
            </Text>

        </View>
    )
}