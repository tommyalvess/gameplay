import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Text, 
    View 
} from 'react-native';

import estilo from './styles';
import Illustration from '../../assets/illustration.png';
import { ButtonIcon } from '../../componetes/ButtonIcon';
import { Background } from '../../componetes/Background';
import { useContext } from 'react';
import { AuthContext, useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function SignIn(){

    const { loading, signIn } = useAuth()
    
    async function handleToHome() {
        try {
            await signIn()
        } catch (error) {
            console.log(error);
            
            //Alert.alert(error)            
        }
    }

    return(
        <Background>
        <View style={estilo.container}>

            <Image 
                source={Illustration}
                style={estilo.image}
                resizeMode="stretch"
            />

            <View style={estilo.content}>

                <Text style={estilo.title}>
                    Conecte-se {'\n'}
                    e organize suas {'\n'}
                    jogatinas {'\n'}
                </Text>

                <Text style={estilo.subTitle}>
                    Crie grupos para jogar seus games {'\n'}
                    favoritos com seus amigos
                </Text>
                
                {  
                    loading ? 
                    
                    <ActivityIndicator color={theme.colors.primary}/> 
                    
                    :
                    
                    <ButtonIcon 
                        onPress={handleToHome}
                        title="Entrar com Discord"/>
                }


            </View>        

            
        </View>
        </Background>
    );
}