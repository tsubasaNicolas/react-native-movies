import React, {useState, useContext, useCallback, useEffect} from 'react'
import { View, Text, Button } from 'react-native';
import axios from 'axios'
import { UserContext } from '../context/UserContext';

const uri = "http://161.35.140.236:9005";
export default function PremiereMovies() {

 const [movies, setMovies] = useState([])
 const [userContext, setUserContext] = useContext(UserContext)

 useEffect(() => {
   setMovies(movies)
 }, [movies])

 const verifyUser = useCallback(() => {
    fetch(`${uri}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setMovies(data)
      } else {
        setMovies(null)
      }

      // 10 minutos
      setTimeout(verifyUser, 10 * 60 * 1000)
    })
  }, [setUserContext])
  useEffect(() => {
    verifyUser()
  }, [verifyUser])

   
const getPremiereMovies = () => {
      
    axios({
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization:  `Bearer ${userContext.payload.token}`,
          
          },
        withCredentials:true,
        url:`${uri}/api/movies/now_playing`,

    }).then( res => {
       const datos =  res.data.data
            
        setMovies(datos)
       // console.log(movies)

        datos.forEach(element => {
         alert(element.title);
         console.log(element.title)
        });
    
    })
    .catch((error) => alert("credenciales erróneas"))
};


    
    return (
        <View>
           <Text> Premier movies </Text>
           <Button title="get premier movies" onPress={()=> getPremiereMovies() }></Button>
        
        </View>
    )
}
