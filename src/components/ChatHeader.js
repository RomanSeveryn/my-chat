import { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'native-base';
import { Avatar } from './Avatar';

export const ChatHeader = () => {
  const route = useRoute();
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  return (
    <View flexDirection='row'>
      <View>
        <Avatar size={40} user={route.params.user} />
      </View>
      <View justifyContent='center' alignItems='center' marginLeft={15}>
        <Text fontSize={18} color={colors.white}>
          {route.params.user.contactName || route.params.user.displayName}
        </Text>
      </View>
    </View>
  );
};
