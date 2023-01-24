import React from 'react';
import {
    Image,
    Text, 
    ScrollView,
    View, 
    ImageProps,
    ImageSourcePropType
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import {SvgProps} from 'react-native-svg'

import { theme } from '../../global/styles/theme';
import estilo  from '../../componetes/Category/styles';

type Props = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>;
    checked?: boolean; //opcional
    hasCheckBox?: boolean;
}

export function Category({
    title,
    icon: Icon, 
    checked = false,
    hasCheckBox = false,
    ...rest
}: Props){

    const {secondary50,secondary70, secondary85, secondary40} = theme.colors;

    return(
        <RectButton {...rest}>

            <LinearGradient
                style={estilo.container}
                colors={[secondary50,secondary70]}
            >

                <LinearGradient 
                    colors={[ checked ? secondary85 :  secondary50, secondary40]}
                    style={[estilo.content, {opacity: checked ? 1 : 0.5 }]}>

                    {
                        hasCheckBox && 
                        <View 
                        style={checked ? 
                        estilo.cheked : estilo.check} 
                        />
                    }
                
                    <Icon 
                        width={48}
                        height={48}
                    />

                    <Text style={estilo.title}>
                        {title}
                    </Text>

                </LinearGradient>
                
            </LinearGradient>

        </RectButton>
    )
}