import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Text, 
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Appointment, AppointmentProps } from '../../componetes/Appointment';
import { Background } from '../../componetes/Background';
import { ButtonAdd } from '../../componetes/ButtonAdd';
import { CategorySelect } from '../../componetes/CategorySelect';
import { ListDivider } from '../../componetes/ListDivider';
import { ListHeader } from '../../componetes/ListHeader';
import { Profile } from '../../componetes/Profile';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {estilo} from './styles';
import { View } from 'react-native';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Load } from '../../componetes/Load';

export function Home(){
    const [category, setCategory] = useState('');
    const [appointments,setAppointments] = useState<AppointmentProps[]>([])
    const [loading,setLoading] = useState(true)

    const navigation = useNavigation();

    //logica de desmarcar 
    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails(guildsSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', {guildsSelected});
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    //Aplicando o filtro para a lista
    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage : AppointmentProps[] = response ? JSON.parse(response) : []

        if (category) {
            setAppointments(storage.filter(item => item.category === category))
        }else{
            setAppointments(storage) 
        }
        setLoading(false)
    }

    //Forma de atualizar sempre a tela quando o state mudar
    //doda vez que voltar para tela a tela sera recarregada. 
    useFocusEffect(useCallback(() => {
        loadAppointments()
    },[category]))

    return(
        <Background>
        <View style={estilo.container}>
            
            <View style={estilo.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <View>
                <CategorySelect 
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />
            </View>

            {
                loading ? <Load /> :
                <>
                   <ListHeader 
                        title="Partidas agendadas"
                        subTitle={`Total ${appointments.length}`}
                    />

                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Appointment 
                                data={item} 
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        ) }
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={estilo.matches}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <ListDivider />} // divisor da lista
                    />
                </>
            }

        </View>
        </Background>
    )
}
