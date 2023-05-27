import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../config.js';
import Logo from '../components/Logo';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Başarılı', 'Giriş yapıldı.');
      navigation.navigate('Home');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error.message);
      Alert.alert('Hata', `Hata oluştu: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.loginLogo} />
      <View style={styles.genel}>
        <Text style={styles.title}>Giriş</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Mail adresiniz"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Şifreniz"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.kayitBtn}>
          <Text onPress={() => navigation.navigate('Signup')}>
            Hesabın yok mu? Kayıt ol.
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  kayitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    
  },
  genel: {
    marginBottom: 100,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#c92a2a',
    marginLeft:'25%',
    width:'50%',
    height:50,
  },
});
