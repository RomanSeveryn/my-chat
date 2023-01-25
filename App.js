import { LogBox, StatusBar, Text } from 'react-native';
import { useAssets } from 'expo-asset';
import { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from './src/screens/SignIn';
import { NativeBaseProvider } from 'native-base';
import { ContextWrapper } from './src/context/ContextWrapper';
import { Profile } from './src/screens/Profile';
import { GlobalContext } from './src/context/Context';
import { ROUTE } from './src/constants/navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Chats } from './src/screens/Chats';
import { Photo } from './src/screens/Photo';
import { Ionicons } from '@expo/vector-icons';
import { Contacts } from './src/screens/Contacts';

LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
            <Stack.Screen
              options={{ title: 'Select Contacts' }}
              name={ROUTE.CONTACTS}
              component={Contacts}
            />
          </Stack.Navigator>
        )}
        <StatusBar />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const Home = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  return (
    <Tab.Navigator
      initialRouteName={ROUTE.CHATS}
      screenOptions={{
        tabBarShowIcon: true,
        tabBarLabelStyle: {
          color: colors.white,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
        },
        tabBarStyle: {
          backgroundColor: colors.foreground,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: () => (
            <Ionicons name='camera' size={20} color={colors.white} />
          ),
        }}
        name={ROUTE.PHOTO}
        component={Photo}
      />
      <Tab.Screen name={ROUTE.CHATS} component={Chats} />
    </Tab.Navigator>
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
