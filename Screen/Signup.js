import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import { firebase } from '../config.js';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const signupUser = async () => {
    try {
      if (password == repassword) {
        if (email && password) {
          await firebase.auth().createUserWithEmailAndPassword(email, password);

          setEmail('');
          setPassword('');
          setRepassword('');

          Alert.alert('Başarılı', 'Kayıt işlemi başarıyla tamamlandı.');
          navigation.navigate('Login');

          return;
        } else {
          Alert.alert('Bilgiler boş', 'Lütfen bilgileri doldurun');
        }
      } else {
        Alert.alert('Şifreler eşleşmiyor', 'Tekrar deneyin');
      }
    } catch (error) {
      Alert.alert('Hata', `Hata olustu: ${error.message} `);
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.loginLogo} />
      <View style={styles.genel}>
        <Text style={styles.title}>Kayıt Ol</Text>
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
        <TextInput
          style={styles.input}
          value={repassword}
          onChangeText={setRepassword}
          placeholder="Şifreniz"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={signupUser}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
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
    marginLeft: '25%',
    width: '50%',
    height: 50,
  },
});
