import React, {useState, useContext, useCallback, useEffect} from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions,ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { UserContext } from '../context/UserContext';
import { useNavigation } from "@react-navigation/native";

const {width} = Dimensions.get("window");
const height = width * 0.6;


const uri = "http://161.35.140.236:9005";
export default function PremiereMovies() {
    const navigation = useNavigation();

 const [movies, setMovies] = useState([])
 const [baseUrl, setBaseUrl] = useState("")
 const [userContext, setUserContext] = useContext(UserContext)


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
  }, [userContext])


  useEffect(() => {
    verifyUser()
    userContext.payload ?  getPremiereMovies() : console.log('sin sesión');
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
       const base = res.data.imageBaseUrl
       setBaseUrl(base)
       const datos =  res.data.data            
        setMovies(datos)

     //   console.log(movies);
    
    })
    .catch((error) => alert("credenciales erróneas"))
};

//const uriImg ="https://image.tmdb.org/t/p/w500"
const RenderItem =() =>{
    return (
    
   <View style ={style.container}>
       <Text style ={style.premiereMoviesTitle}>
        Premiere Movies
       </Text>

            <ScrollView
            pagingEnabled
            horizontal
           // onScroll={(e) => change(e.nativeEvent)}
            showsHorizontalScrollIndicator={false}
            style={style.scroll}
            >
               {  movies != null ?
           movies.map((e, index) => {
               const img = baseUrl + e.backdrop_path
               const poster = baseUrl + e.poster_path
               return(
                  <TouchableOpacity  onPress={()=> navigation.navigate("Details",
                  {id:e.id, 
                   title:e.title,
                   img: img,
                   poster:poster,
                   overview: e.overview
 
                 })}
                  key={index}>
                    <Image
                   
                    source={{uri: img}}
                    style={style.image}
                    />
                    <View style={style.pagination}>
                    <Text style={style.paginationActiveText}>{e.title}</Text>
                    </View>
                
                  </TouchableOpacity>
                    )
                }
          ):
          <Text>no hay movies</Text>
          }

</ScrollView>

</View>
          
    )
}
// useEffect(() => {
//     getPremiereMovies();
//    RenderItem();
// }, [movies])
    
    return (
        <View>
         
        <RenderItem/>

        </View>
    )
}
const style = StyleSheet.create({
    container:{marginTop:50, width, height},
    scroll:{width, height},
    image:{width, height, resizeMode:'cover'},
    pagination:{flexDirection:'row', position:'absolute', bottom:0, alignSelf:"center"},
    paginationText:{fontSize:(width/30), color:'#888', margin:3},
    paginationActiveText:{fontSize:(width/20), color:'#fff', margin:3},
    premiereMoviesTitle:{textAlign:"center", color:"white", fontSize:24, backgroundColor:"#21618C"}
    

    })

