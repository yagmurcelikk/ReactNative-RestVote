import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screen/Login';
import Signup from './Screen/Signup';
import Home from './Screen/Home';

import { firebase } from './config.js';

const Stack = createStackNavigator();

const AuthContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authContextValue = useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          await firebase.auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
          console.log(error.message);
        }
      },

      signOut: async () => {
        try {
          await firebase.auth().signOut();
        } catch (error) {
          console.log(error.message);
        }
      },
    }),
    []
  );

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Signout successfully.');
      })
      .catch((error) => {
        console.log('Error saignout: ', error);
      });
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                children={(props) => (
                  <Home {...props} user={user} signOut={signOut} />
                )}
              />
            </>
          ) : (
            null
          )}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
