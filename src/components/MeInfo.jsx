import React, {useState, useContext, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {UserContext} from '../context/UserContext';
import axios from 'axios';

const uri = 'http://161.35.140.236:9005';

export default function MeInfo() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [me, setMe] = useState([]);

  const getInfoMe = () => {
    axios({
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userContext.payload.token}`,
      },
      withCredentials: true,
      url: `${uri}/api/user/me`,
    })
      .then(res => {
        const datos = res.data;
        setMe(datos);
        console.log(datos);
      })
      .catch(error => alert('Me info credenciales erróneas'));
  };

  useEffect(() => {
    getInfoMe();
  }, []);

  //console.log(me.data.username);
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 28,
          backgroundColor: '#196F3D',
          color: 'white',
          height: 100,
        }}>
        Hola: {me.data ? me.data.username : 'invitado'}
      </Text>
      <Button title="me info" onPress={() => getInfoMe()}></Button>
    </View>
  );
}
