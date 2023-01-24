import React from 'react';
import {
    Image,
    Text, 
    ScrollView,
    View 
} from 'react-native';

import { categories } from '../../Utils/categories';
import { Category } from '../Category';
import estilo from './styles';

type Prop = {
    categorySelected: string;
    setCategory: (categoryId: string) => void 
    hasCheckBox?: boolean,
}

export function CategorySelect({categorySelected, setCategory, hasCheckBox = false} : Prop){
    return(
        <ScrollView
            horizontal
            style={estilo.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40}}
        >
            {
                categories.map(category => (
                   <Category 
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    checked={category.id === categorySelected}
                    onPress={() => setCategory(category.id)}
                    hasCheckBox={hasCheckBox}
                   />
                ))
            }

        </ScrollView>
    )
}