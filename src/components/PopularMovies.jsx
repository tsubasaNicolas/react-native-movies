import React, {useState, useContext, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {UserContext} from '../context/UserContext';
import {useNavigation} from '@react-navigation/native';

const uri = 'http://161.35.140.236:9005';

export default function PopularMovies() {
  const navigation = useNavigation();

  const [movies, setMovies] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    //  verifyUser();
    getPopularMovies();
  }, [userContext]);

  console.log(userContext);

  const getPopularMovies = () => {
    axios({
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext.payload.token}`,
      },
      withCredentials: true,
      url: `${uri}/api/movies/popular`,
    })
      .then(res => {
        const base = res.data.imageBaseUrl;
        setBaseUrl(base);
        const datos = res.data.data;
        setMovies(datos);
        console.log(datos);
      })
      .catch(error => alert('Popular credenciales erróneas'));
  };

  //const uriImg ="https://image.tmdb.org/t/p/w500"
  const RenderItem = () => {
    return (
      <View style={style.container}>
        <Text style={style.popularMoviesTitle}>Popular Movies</Text>
        <ScrollView style={style.scroll}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
            }}>
            {movies != null ? (
              movies.map((e, index) => {
                const img = baseUrl + e.backdrop_path;
                const poster = baseUrl + e.poster_path;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Details', {
                        id: e.id,
                        title: e.title,
                        img: img,
                        poster: poster,
                        overview: e.overview,
                      })
                    }
                    style={{width: 130, height: 300, margin: 3}}
                    key={index}>
                    <Image source={{uri: img}} style={style.image} />
                    <View style={style.pagination}>
                      <Text style={style.titleMovie}>{e.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text>no hay movies</Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  };
  // useEffect(() => {
  //     getPremiereMovies();
  //    RenderItem();
  // }, [movies])

  return (
    <View>
      {/* <Button title="get popular movies" onPress={()=> getPopularMovies() }></Button> */}
      <RenderItem />
    </View>
  );
}
const style = StyleSheet.create({
  image: {width: '100%', height: 240, resizeMode: 'cover'},
  popularMoviesTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    backgroundColor: '#78281F',
    marginTop: 20,
  },
  titleMovie: {textAlign: 'center', fontSize: 16},
});
