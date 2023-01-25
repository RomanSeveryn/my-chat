import { LogBox, StatusBar, Text } from 'react-native';
import { useAssets } from 'expo-asset';
import { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from './src/screens/SignIn';
import { NativeBaseProvider, View } from 'native-base';
import { ContextWrapper } from './src/context/ContextWrapper';
import { Profile } from './src/screens/Profile';
import { GlobalContext } from './src/context/Context';
import { ROUTE } from './src/constants/navigation';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const Stack = createStackNavigator();
  const {
    theme: { colors },
  } = useContext(GlobalContext);

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
            <Stack.Screen name={ROUTE.SIGNIN} component={SignIn} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.foreground,
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTintColor: colors.white,
            }}
          >
            {!currentUser.displayName && (
              <Stack.Screen name={ROUTE.PROFILE} component={Profile} />
            )}
            <Stack.Screen
              options={{ title: 'Whatsapp' }}
              name={ROUTE.HOME}
              component={Home}
            />
          </Stack.Navigator>
        )}
        <StatusBar />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const Home = () => {
  return (
    <View>
      <Text>Hi Home</Text>
    </View>
  );
};

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
