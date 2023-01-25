import { View, Text, Image, Input, Button } from 'native-base';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/Context';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { askFroPermission, pickImage, uploadImage } from '../utils/utils';
import { auth, db } from '../../firebase';
import { updateProfile } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../constants/navigation';

export const Profile = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const [displayName, setDisplayName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await askFroPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const handlePress = async () => {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        'profilePicture',
      );

      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }

    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, 'users', user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate(ROUTE.HOME);
  };

  const handleProfileImage = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }

  if (permissionStatus !== 'granted') {
    return <Text>You need allow this permission</Text>;
  }
  return (
    <View alignItems='center'>
      <Text fontSize={22} color={colors.foreground}>
        Profile Info
      </Text>
      <TouchableOpacity
        onPress={handleProfileImage}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 130,
          height: 130,
          backgroundColor: colors.background,
          borderRadius: 120,
        }}
      >
        {!selectedImage ? (
          <MaterialCommunityIcons
            name='camera-plus'
            size={45}
            color={colors.iconGray}
          />
        ) : (
          <Image
            source={{ uri: selectedImage }}
            width='100%'
            height='100%'
            borderRadius='120'
            alt='selectedImage'
          />
        )}
      </TouchableOpacity>
      <Input
        value={displayName}
        onChangeText={setDisplayName}
        variant='underlined'
        placeholder='Type your name'
        width='80%'
      />
      <Button mt={2} onPress={handlePress} isDisabled={!displayName}>
        Next
      </Button>
    </View>
  );
};
