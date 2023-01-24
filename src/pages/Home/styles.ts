import { theme } from './../../global/styles/theme';
import { StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const estilo = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    matches:{
        marginTop: 24,
        marginLeft: 24
    }
})