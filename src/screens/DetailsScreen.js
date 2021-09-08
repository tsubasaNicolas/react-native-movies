import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import {UserContext} from '../context/UserContext';

const uri = 'http://161.35.140.236:9005';

export default function DetailsScreen({route}) {
  const {id, title, img, poster, overview} = route.params;

  const [movies, setMovies] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  console.log(route.params);

  useEffect(() => {
    getActors();
  }, [userContext]);

  const getActors = () => {
    axios({
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext.payload.token}`,
      },
      withCredentials: true,
      url: `${uri}/api/movies/${id}/actors`,
    })
      .then(res => {
        const base = res.data.imageBaseUrl;
        setBaseUrl(base);
        const datos = res.data.data;
        console.log(base);
        setMovies(datos);

        //  console.log(userContext.payload.refresh_token);
      })
      .catch(error => alert('Detail credenciales erróneas'));
  };

  console.log(userContext);

  const baseUrlProfile = 'https://image.tmdb.org/t/p/w500';

  const baseUrlProfile2 =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9YElNlKiK8uTdHziB6UU8IIrqwrSjSzupA&usqp=CAU';

  const RenderItem = () => {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'space-around',
          }}>
          {movies != null ? (
            movies.map((e, index) => {
              const img = e.profile_path
                ? baseUrlProfile + e.profile_path
                : baseUrlProfile2;

              return (
                <View key={index} style={{width: 126, height: 160, margin: 3}}>
                  <View>
                    <Text style={{textAlign: 'center'}}>{e.name}</Text>
                    <Image
                      source={{uri: img}}
                      style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                    />

                    <Text style={{textAlign: 'center'}}>{e.character}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>no hay movies</Text>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <ScrollView>
      <View style={{padding: 2}}>
        <Text style={{textAlign: 'center'}}>{title}</Text>

        <Image source={{uri: poster}} style={style.poster} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 3,
          }}>
          <Image
            source={{uri: img}}
            style={{width: 100, height: 140, resizeMode: 'cover'}}
          />
          <Text
            style={{
              color: 'green',
              margin: 5,
              marginTop: 0,
              width: '76%',
              overflow: 'hidden',
            }}>
            {overview}{' '}
          </Text>
        </View>

        <View>
          <Text style={{textAlign: 'center', color: 'green', fontSize: 24}}>
            Reparto
          </Text>

          <RenderItem />
        </View>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  poster: {width: '100%', height: 340, resizeMode: 'contain', marginBottom: 5},
});
