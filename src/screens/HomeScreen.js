import React, {useContext} from 'react';
import { View, Text, ScrollView } from 'react-native';

import PremiereMovies from '../components/PremiereMovies';
import PopularMovies from '../components/PopularMovies';
import { UserContext } from '../context/UserContext';


export default function HomeScreen() {
  const [userContext, setUserContext] = useContext(UserContext)

 return  (
       <ScrollView>
         <Text style={{ textAlign:"center", 
                        fontSize:28, 
                        backgroundColor:"#196F3D", 
                        color:"white", 
                        height:100
                        }}>Welcome</Text>
          <View>
           
          <PremiereMovies/>

          <PopularMovies/>

        
         
      
        </View>
      
       </ScrollView>
        )
  
}