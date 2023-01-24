import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, FlatList, Alert, Platform, Share, Linking } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';

import { Background } from '../../componetes/Background';
import { Header } from '../../componetes/Header';
import { theme } from '../../global/styles/theme';
import { estilo } from './styles';

import BannerImg from '../../assets/banner.png';
import { ListHeader } from '../../componetes/ListHeader';
import { Member, MemberProps } from '../../componetes/Member';
import { ListDivider } from '../../componetes/ListDivider';
import { ButtonIcon } from '../../componetes/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../componetes/Appointment';
import { api } from '../../services/api';
import { Load } from '../../componetes/Load';

type Params = {
  guildsSelected: AppointmentProps
}

type GuildWidget = {
  id: string
  name: string
  instant_invite: string
  members: MemberProps[]
}

export function AppointmentDetails() {
  const [widget,setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading,setLoading] = useState(true)

  const routes = useRoute()
  const {guildsSelected} = routes.params as Params
  

  async function fetchGuildInfo() {
    try {
      const resp = await api.get(`/guilds/${guildsSelected.guild.id}/widget.json`)
       setWidget(resp.data)
    } catch {
      Alert.alert('Verifique  as configuracoes do servidor')
    }finally{
      setLoading(false)
    }
  }

  function handleShareInvitation() {
    
    const message = Platform.OS === 'ios'
    ? `Junte-se ao ${guildsSelected.guild.name}`
    : widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }

  useEffect(() => {
    fetchGuildInfo()
  },[])
 
  return (
      <Background>

        <Header 
          title={"Detalhes"}
          action={
            guildsSelected.guild.owner &&   
            <BorderlessButton onPress={handleShareInvitation} >
              <Fontisto
                name="share"
                size={24}
                color={theme.colors.primary}
              />
            </BorderlessButton>
          }
        />

        <ImageBackground
          source={BannerImg}
          style={estilo.banner}
        >
          <View style={estilo.bannerContent}>
            <Text style={estilo.title}>
              {guildsSelected.guild.name}
            </Text>

            <Text style={estilo.subtitle}>
              {guildsSelected.description}
            </Text>
          </View>

        </ImageBackground>

        {
          loading ? <Load /> :

          <>
              <ListHeader 
                title="Jogadores"
                subTitle={`Total ${widget.members ? widget.members.length : 0}`}
              />

              <FlatList 
                data={widget.members}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Member data={item} />
                )}
                style={estilo.members}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider isCentered/>} // divisor da lista
              />
          </>
        }

        {
          guildsSelected.guild.owner &&

          <View style={estilo.footer}>
            <ButtonIcon
              title="Entrar na partida"
              onPress={handleOpenGuild}
            />
          </View>

        }
    

      </Background>
  )
}