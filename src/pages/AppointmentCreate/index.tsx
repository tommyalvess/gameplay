import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import {
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { theme } from '../../global/styles/theme';

import { CategorySelect } from '../../componetes/CategorySelect';
import { ModalView } from '../../componetes/ModalView';
import { Background } from '../../componetes/Background';
import { SmallInput } from '../../componetes/SmallInput';
import { GuildIcon } from '../../componetes/GuildIcon';
import { TextArea } from '../../componetes/TextArea';
import { GuildProps } from '../../componetes/Guild';
import { Header } from '../../componetes/Header';
import { Button } from '../../componetes/Button';
import { Guilds } from '../Guilds';
import { estilo } from './style';


export function AppointmentCreate(){
  const [category, setCategory] = useState('');
  const [openGuildsModa, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleOpenGuilds(){
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds(){
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps){
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  } 

  async function handleSave() {
    const newAppointment = {
        id: uuid,
        guild, 
        category,
        date:` ${day}/${month} às ${hour}:${minute}`,
        description
    }

    //pegando o que tinha antes e salvando localmente os novos
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const appointment = storage ? JSON.parse(storage) : []

    await AsyncStorage.setItem(
        COLLECTION_APPOINTMENTS,
        JSON.stringify([...appointment, newAppointment])
      )
      
      navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      style={estilo.container}
    >
      <Background>
        <ScrollView>  
          <Header 
            title="Agendar partida"
          />

          <Text style={[
            estilo.label, 
            { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}
          >
            Categoria
          </Text>

          <CategorySelect 
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={estilo.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={estilo.select}>
               
                <GuildIcon guildId={guild.id} iconId={guild.icon} /> 

                <View style={estilo.selectBody}>
                  <Text style={estilo.label}>
                    { 
                      guild.name 
                      ? guild.name 
                      : 'Selecione um servidor' 
                    }
                  </Text>
                </View>

                <Feather 
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>
            
            <View style={estilo.field}>
              <View>
                <Text style={[estilo.label, { marginBottom: 12 } ]}>
                  Dia e mês
                </Text>

                <View style={estilo.column}>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setDay}
                  />
                  <Text style={estilo.divider}>
                    /
                  </Text>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[estilo.label, { marginBottom: 12 } ]}>
                  Hora e minuto
                </Text>

                <View style={estilo.column}>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setHour}
                  />
                  <Text style={estilo.divider}>
                    :
                  </Text>
                  <SmallInput 
                    maxLength={2} 
                    onChangeText={setMinute}
                  />
                </View>
              </View>           
            </View>

            <View style={[estilo.field, { marginBottom: 12 }]}>
              <Text style={estilo.label}>
                Descrição
              </Text>

              <Text style={estilo.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />

            <View style={estilo.footer}>
              <Button 
                title="Agendar"  
                onPress={handleSave}
              />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModa} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>
      
    </KeyboardAvoidingView>
  );
}