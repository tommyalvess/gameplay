import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../pages/Home';
import { theme } from '../global/styles/theme';
import { AppointmentDetails } from '../pages/AppointmentDetails';
import { AppointmentCreate } from '../pages/AppointmentCreate';
import { Guilds } from '../pages/Guilds';

const { Navigator, Screen } =  createNativeStackNavigator();

export function AuthRoutes() {

    return(
        
        <Navigator   
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: theme.colors.secondary100},
            }}
        >

            <Screen 
                name="Home"
                component={Home}
            />

            <Screen 
                name="AppointmentCreate"
                component={AppointmentCreate}
            />  

            <Screen 
                name="AppointmentDetails"
                component={AppointmentDetails}
            />  

            <Screen 
                name="Guilds"
                component={Guilds}
            />  

        </Navigator>
        
    )
    
}