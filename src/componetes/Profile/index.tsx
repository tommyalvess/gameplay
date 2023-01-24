import React from "react";
import {
    Alert,
    Image,
    Text, 
    View 
} from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";

import { estilo } from "./styles";



export function Profile() {

    const {user,signOut} = useAuth()

    function handleSignOut() {
        Alert.alert('Logout','Deseja sair do GamePlay?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => signOut()
            }
        ])
    }

    return(
        <View style={estilo.container}>
            
            <RectButton onPress={handleSignOut}>
                <Avatar urlsImage={user.avatar} />
            </RectButton>

            <View>
                <View style={estilo.user}>

                    <Text style={estilo.greeting}>
                        Olá,
                    </Text>

                    <Text style={estilo.username}>
                        {user.firstname}
                    </Text>

                </View>

                <Text style={estilo.msg}>
                    Hoje é dia de vitória
                </Text>
            </View>

        </View>
    )
}