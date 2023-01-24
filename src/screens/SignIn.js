import { View, Text, Image, Input, Stack, Button } from 'native-base';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/Context';
import { TouchableOpacity } from 'react-native';
import { signUp } from '../../firebase';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signUp');
  console.log('email', email);
  console.log('password', password);
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const handlePress = async () => {
    console.log('=======');
    if (mode === 'signUp') {
      await signUp(email, password);
    }

    if (mode === 'signIn') {
      await signUp(email, password);
    }
  };

  return (
    <View
      flex={1}
      justifyContent='center'
      alignItems='center'
      backgroundColor={colors.white}
    >
      <Text fontSize={24} color={colors.foreground}>
        Welcome to Whatsapp
      </Text>
      <Image
        width={180}
        height={180}
        resizeMode='cover'
        source={require('../../assets/welcome-img.png')}
        alt='welcome-img'
      />
      <Stack space={4} w='65%' maxW='300px' mx='auto' mt={12}>
        <Input
          value={email}
          onChangeText={setEmail}
          variant='underlined'
          placeholder='Email'
        />
        <Input
          value={password}
          onChangeText={setPassword}
          variant='underlined'
          placeholder='Password'
          type='password'
        />
        <Button mt={2} onPress={handlePress} isDisabled={!email || !password}>
          {mode === 'signUp' ? 'Sign Up' : 'Sign In'}
        </Button>
        <TouchableOpacity
          style={{ marginTop: 15, alignItems: 'center' }}
          onPress={() =>
            mode === 'signUp' ? setMode('signIn') : setMode('signUp')
          }
        >
          <Text style={{ color: colors.secondaryText }}>
            {mode === 'signUp'
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </Stack>
    </View>
  );
};
