import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { firebase } from '../config.js';

const BasvuruFormu = (props) => {
  const navigation = useNavigation();
  const [oneriList, setOneriList] = useState([]);
  const todoRef = firebase.firestore().collection('kyOdevcol');

  const [mekanadi, setMekanadi] = useState('');
  const [yemekadi, setYemekadi] = useState('');
  const [oneri, setOneri] = useState('');

  const [konumrating, setKonumRating] = useState(null);
  const [hizrating, setHizRating] = useState(null);
  const [tadrating, setTadRating] = useState(null);
  const [servisrating, setServisRating] = useState(null);

  const handlePress = (value, type) => {
    if (type === 'konum') {
      setKonumRating(value);
    } else if (type === 'hiz') {
      setHizRating(value);
    } else if (type === 'tad') {
      setTadRating(value);
    } else if (type === 'servis') {
      setServisRating(value);
    }
  };

  const { user } = props; 
  const { signOut } = props;

  const handleSubmit = () => {
    const newOneri = {
      mekanadi: mekanadi,
      yemekadi: yemekadi,
      konum: konumrating,
      hiz: hizrating,
      tad: tadrating,
      servis: servisrating,
      oneri: oneri,
      userId: user.uid,
    };
    todoRef
      .add(newOneri)
      .then(() => {
        Alert.alert('Değerlendirmeniz', 'Başarıyla iletildi, Teşekkür ederiz.');
        setMekanadi('');
        setYemekadi('');
        setOneri('');
        setHizRating('');
        setKonumRating('');
        setTadRating('');
        setServisRating('');
      })
      .catch((error) => {
        alert(error);
      });
  };

 useEffect(() => {
  if (!user) return;
  console.log(user.uid);
  console.log(typeof user.uid);
  todoRef
    .where('userId', '==', user.uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot) => {
      const oneriList = [];
      querySnapshot.forEach((doc) => {
        const { mekanadi } = doc.data();
        const { yemekadi } = doc.data();
        const { konum } = doc.data();
        const { hiz } = doc.data;
        const { tad } = doc.data();
        const { servis } = doc.data();
        const { oneri } = doc.data();
        oneriList.push({
          id: doc.id,
          mekanadi,
          yemekadi,
          konum,
          hiz,
          tad,
          servis,
          oneri,
          userId: user.uid,
        });
      });
      setOneriList(oneriList);
    });
}, [user, todoRef]);


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Mekan Adı:</Text>
        <TextInput
          style={styles.input}
          value={mekanadi}
          onChangeText={(text) => setMekanadi(text)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Yemek Adı:</Text>
        <TextInput
          style={styles.input}
          value={yemekadi}
          onChangeText={(text) => setYemekadi(text)}
        />
      </View>

      <Text style={styles.labelsecm}>
        Konum:
        {konumrating && <Text style={styles.selected}>{konumrating}</Text>}
      </Text>
      <View style={styles.row}>
        <>
          <TouchableOpacity
            style={[
              styles.radio,
              konumrating === 'Kötü' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Kötü', 'konum')}>
            <Text style={styles.radioLabel}>Kötü</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              konumrating === 'İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('İyi', 'konum')}>
            <Text style={styles.radioLabel}>İyi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              konumrating === 'Çok İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Çok İyi', 'konum')}>
            <Text style={styles.radioLabel}>Çok İyi</Text>
          </TouchableOpacity>
        </>
      </View>

      <Text style={styles.labelsecm}>
        Hız:{hizrating && <Text style={styles.selected}>{hizrating}</Text>}
      </Text>
      <View style={styles.row}>
        <>
          <TouchableOpacity
            style={[
              styles.radio,
              hizrating === 'Kötü' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Kötü', 'hiz')}>
            <Text style={styles.radioLabel}>Kötü</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              hizrating === 'İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('İyi', 'hiz')}>
            <Text style={styles.radioLabel}>İyi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              hizrating === 'Çok İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Çok İyi', 'hiz')}>
            <Text style={styles.radioLabel}>Çok İyi</Text>
          </TouchableOpacity>
        </>
      </View>

      <Text style={styles.labelsecm}>
        Tad:{tadrating && <Text style={styles.selected}>{tadrating}</Text>}
      </Text>
      <View style={styles.row}>
        <>
          <TouchableOpacity
            style={[
              styles.radio,
              tadrating === 'Kötü' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Kötü', 'tad')}>
            <Text style={styles.radioLabel}>Kötü</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              tadrating === 'İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('İyi', 'tad')}>
            <Text style={styles.radioLabel}>İyi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              tadrating === 'Çok İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Çok İyi', 'tad')}>
            <Text style={styles.radioLabel}>Çok İyi</Text>
          </TouchableOpacity>
        </>
      </View>

      <Text style={styles.labelsecm}>
        Servis:
        {servisrating && <Text style={styles.selected}>{servisrating}</Text>}
      </Text>
      <View style={styles.row}>
        <>
          <TouchableOpacity
            style={[
              styles.radio,
              servisrating === 'Kötü' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Kötü', 'servis')}>
            <Text style={styles.radioLabel}>Kötü</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              servisrating === 'İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('İyi', 'servis')}>
            <Text style={styles.radioLabel}>İyi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radio,
              servisrating === 'Çok İyi' ? styles.radioSelected : null,
            ]}
            onPress={() => handlePress('Çok İyi', 'servis')}>
            <Text style={styles.radioLabel}>Çok İyi</Text>
          </TouchableOpacity>
        </>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Öneriniz:</Text>
        <TextInput
          style={styles.input}
          value={oneri}
          placeholder="kısa bir şekilde açıklayın,"
          onChangeText={(text) => setOneri(text)}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Gönder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSignOut} onPress={signOut}>
          <Text style={styles.buttonSignOutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    width: '50%',
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    transitionProperty: 'all',
    transitionDuration: 300,
    transitionTimingFunction: 'ease',
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
   justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonSignOut: {
    marginTop: 10,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: 'gray',
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: 'blue',
  },
  buttonSignOutText: {
    color: 'white',
    fontSize: 20,
  },
  labelsecm: {
    fontSize: 18,
    fontWeight: 'black',
  },
  radio: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: '20%',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    color: 'black',
  },
  selected: {
    fontSize: 18,
    fontWeight: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default BasvuruFormu;
