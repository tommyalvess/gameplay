import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';


import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';

//Telas
import { Background } from './src/componetes/Background';
import { Routes } from './src/routes';
import { AuthProvider } from './src/hooks/auth';



export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if (!fontsLoaded) {
    console.log("Sem fonte");
    
    return <AppLoading />;
  }

  return (
    <Background>
      <StatusBar 
        style="auto" />
      {/* Colocando context para todas as rotas que desejarmos */}
      <AuthProvider>
        <Routes />
      </AuthProvider>

    </Background>
  );
}

