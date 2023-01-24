import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Guild, GuildProps } from '../../componetes/Guild';
import { ListDivider } from '../../componetes/ListDivider';
import { Load } from '../../componetes/Load';
import { api } from '../../services/api';
import { estilo } from './styles';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
  }

export function Guilds({handleGuildSelect}: Props){

  const [guilds,setGuilds] = useState<GuildProps[]>([])
  const [loading,setLoading] = useState(true)

  async function fetchGuilds() {
    const resp = await api.get('/users/@me/guilds')

    setGuilds(resp.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchGuilds()
  },[])

  return (
      <View style={estilo.container}>
        {
          loading ? <Load /> :
          <FlatList 
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <Guild data={item} 
                onPress={() => handleGuildSelect(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
            ListHeaderComponent={() => <ListDivider isCentered/>}
            ItemSeparatorComponent={() => <ListDivider  isCentered/>}
            style={estilo.guilds}
          />
        }
          
      </View>
  )
}
