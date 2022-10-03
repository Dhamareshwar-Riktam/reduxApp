import React from 'react';

// UI Libraries
import {
  StatusBar
} from 'react-native';
import { NativeBaseProvider } from 'native-base';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './store';

// Screens
import Add from './screens/Add';
import Home from './screens/Home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar
          backgroundColor="#0f4c75"
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#0f4c75'
              },
              title: 'Netflix App',
              headerTitleStyle: {
                color: '#00B7C2'
              },
              headerTitleAlign: 'center'
            }}
          >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Add' component={Add} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};


export default App;