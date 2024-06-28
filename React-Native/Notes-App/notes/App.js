import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import EditNote from './src/screens/EditNote';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' >

        <Stack.Screen name='Notes' component={Home}
          options={{
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor
          }}
        />

        <Stack.Screen name='Note' component={EditNote}
          options={{
            headerStyle: styles.headerStyle,
            headerTintColor: styles.headerTintColor
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#4f46e5'
  },
  headerTintColor: '#fff'
});
