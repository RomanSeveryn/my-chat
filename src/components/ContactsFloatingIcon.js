import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../context/Context';
import { ROUTE } from '../constants/navigation';

export const ContactsFloatingIcon = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTE.CONTACTS)}
      style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialCommunityIcons
        name='android-messages'
        size={30}
        color='white'
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
};
