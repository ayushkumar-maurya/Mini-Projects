import { useState } from 'react';
import { StyleSheet, Alert, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Login';
import CreateNewUser from './src/screens/CreateNewUser';
import Dashboard from './src/screens/Dashboard';
import Statement from './src/screens/Statement';
import getColour from './src/utils/Colours';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [screenName, setScreenName] = useState(null);

  if(screenName) {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ screenName }>

          <Stack.Screen name='Login' component={ Login }
            options={{
              headerStyle: styles.header.style,
              headerTintColor: styles.header.tintColor
            }}
          />

          <Stack.Screen name='Create New User' component={ CreateNewUser }
            options={{
              headerStyle: styles.header.style,
              headerTintColor: styles.header.tintColor
            }}
          />

          <Stack.Screen name='Dashboard' component={ Dashboard }
            options={{
              headerStyle: styles.header.style,
              headerTintColor: styles.header.tintColor
            }}
          />

          <Stack.Screen name='Statement' component={ Statement }
            options={{
              headerStyle: styles.header.style,
              headerTintColor: styles.header.tintColor
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  else {
    let userEmail = null;
    let userPassword = null;
    try {
      // Fetching Email.
      AsyncStorage.getItem('UserEmail').then(value => {
        userEmail = value;
        // Fetching Password.
        AsyncStorage.getItem('UserPassword').then(value => {
          userPassword = value;
          setScreenName((userEmail && userPassword) ? 'Dashboard' : 'Login');
        })
      })

    } catch (error) {
      Alert.alert('Warning', 'Something went wrong.', [
        { text: 'OK' },
      ])
    }

    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    style: {
      backgroundColor: getColour('colour3')
    },
    tintColor: getColour('colour4')
  },
  loading: {
    flex: 1,
    backgroundColor: getColour('colour1'),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
