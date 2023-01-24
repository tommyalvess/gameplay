import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from "./app.routes";
import { useAuth } from "../hooks/auth";
import { SignIn } from "../pages/SignIn";

export function Routes() {

    const {user} = useAuth()

    return(
        //Validando se tem usuario logado
        <NavigationContainer>
            {user.id ? <AuthRoutes /> : <SignIn />}
        </NavigationContainer>
    )
}