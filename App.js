import { LogBox, Text } from 'react-native';
import { useAssets } from 'expo-asset';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from './src/screens/SignIn';
import { NativeBaseProvider } from 'native-base';
import { ContextWrapper } from './src/context/ContextWrapper';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const Stack = createStackNavigator();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Hello</Text>;
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {!currentUser ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='sign-in' component={SignIn} />
          </Stack.Navigator>
        ) : (
          <Text>Hi</Text>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const Main = () => {
  const [assets] = useAssets(
    require('./assets/icon-square.png'),
    require('./assets/chatbg.png'),
    require('./assets/user-icon.png'),
    require('./assets/welcome-img.png'),
  );

  if (!assets) {
    return <Text>Loading ...</Text>;
  }

  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
};
