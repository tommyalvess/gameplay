import React, {createContext,ReactNode,useContext,useEffect,useState} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSession from 'expo-auth-session'
import {api} from "../services/api";
import { COLLECTION_USERS } from "../configs/database";

const {CLIENT_ID} = process.env;
const {CND_IMAGE} = process.env;
const {REDIRECT_URI} = process.env;
const {RESPONSE_TYPE} = process.env;
const {SCOPE} = process.env;

type User = {
    id: string,
    username: string,
    firstname: string,
    avatar: string,
    email:string,
    token: string
}

type AuthContextData = {
    user: User
    loading: boolean
    signIn: () => Promise<void>
    signOut: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

type AuthResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string
    }
}

//Estamos criando um contexto pra ser usado com varias telas
export const AuthContext = createContext({} as AuthContextData) //estamos inicinado ele como obj

//Essa funcao eu ja estou passando quem vai ter acesso a esse context e deixando dinamicamente atraves do {children}
function AuthProvider({children}:AuthProviderProps) {

    const [user,setUser] = useState<User>({} as User)
    const [loading,setLoading] = useState(false) //loading para aguardar a finalizacao da auth

    //vamos disponibilizar em qualquer lugar
    async function signIn() {
        try {
            setLoading(true)
            
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
            const { type, params } =  await AuthSession
            .startAsync({ authUrl })  as AuthResponse// para onde ele tem que ir quando o user comecar o processo de auth.

            if(type === "success" && !params.error){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`

                const userInfo = await api.get('/users/@me')

                const firstname = userInfo.data.username.split(' ')[0]
                userInfo.data.avatar = `${CND_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                const userData = {
                    ...userInfo.data,
                    firstname,
                    token: params.access_token
                }

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))

                setUser(userData)
            }

        } catch (error) {
            console.log(error);
            
            throw new Error("Auth failed!")
        }finally {
            setLoading(false)
        }
    }

    async function signOut() {
        setUser({} as User)
        await AsyncStorage.removeItem(COLLECTION_USERS)
    }

    //Loica para verificar se o user esta logado e assim nao precisar refazer o login 
    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USERS)

        if (storage) {
            const userLoggerd = JSON.parse(storage) as User
            api.defaults.headers.authorization = `Bearer ${userLoggerd.token}`

            setUser(userLoggerd)
        }
    }

    useEffect(() => {
        loadUserStorageData()
    },[])

    return(
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {
    AuthProvider,
    useAuth
}