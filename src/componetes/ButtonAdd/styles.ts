import { theme } from './../../global/styles/theme';
import { StyleSheet} from 'react-native';

const estilo = StyleSheet.create({
    container:{
       height: 48,
       width: 48,
       backgroundColor: theme.colors.primary,
       borderRadius: 8,
       alignItems: 'center',
       justifyContent:  'center'
    },
})

export default estilo;