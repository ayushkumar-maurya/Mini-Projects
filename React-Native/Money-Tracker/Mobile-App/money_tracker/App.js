import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import CreateNewUser from './src/screens/CreateNewUser';
import Dashboard from './src/screens/Dashboard';
import getColour from './src/utils/Colours';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>

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

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    style: {
      backgroundColor: getColour('primaryBg')
    },
    tintColor: getColour('primaryFont')
  }
});
