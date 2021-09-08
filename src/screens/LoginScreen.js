import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {UserContext} from '../context/UserContext';

const uri = 'http://161.35.140.236:9005';
export default function LoginScreen({navigation}) {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const onSubmit = () => {
    axios({
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: `${uri}/api/auth/login`,
    })
      .then(async res => {
        const datos = await res.data.data;
        setUserContext(datos);
        refresh();
      })
      .catch(error => alert('login credenciales erróneas'));
  };

  const refresh = () => {
    axios({
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        refresh_token: userContext.payload.refresh_token,
      },
      withCredentials: true,
      url: `${uri}/api/auth/refresh`,
    })
      .then(async res => {
        const datos = await res.data.data;
        setUserContext(datos);
        navigation.navigate('Home');
      })
      .catch(error => alert('refresh credenciales erróneas'));
  };

  //  console.log(userContext.payload.refresh_token);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="username"
          placeholderTextColor="white"
          //onChangeText={(email) => setEmail(email)}
          onChange={e => setLoginUsername(e.nativeEvent.text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="white"
          secureTextEntry={true}
          // onChangeText={(password) => setPassword(password)}
          onChange={e => setLoginPassword(e.nativeEvent.text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text onPress={onSubmit}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#2980B9',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#F1C40F',
  },
});
