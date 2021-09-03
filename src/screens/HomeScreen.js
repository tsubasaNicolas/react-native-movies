import React from 'react';
import { View, Text, Button } from 'react-native';
import PremiereMovies from '../components/PremiereMovies';
import PopularMovies from '../components/PopularMovies';

export default function HomeScreen({navigation}) {

 return  (
        <View>
            <Text>Home</Text>
            
            <Button title="ir a Details" onPress={()=> navigation.navigate("Details", {id:"idPelicula"})}>
         
            </Button>
 

          <PremiereMovies/>
          
          <PopularMovies/>
      
        </View>
        )
  
}