import React from 'react'
import { View, Text } from 'react-native';

export default function DetailsScreen({route}) {
    const {id} = route.params
   
    return (
        <View>
        <Text>el id de la pelicula es { id}</Text>
    </View>
    )
}
