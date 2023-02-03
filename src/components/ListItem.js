import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { GlobalContext } from '../context/Context';
import { Text, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Avatar } from './Avatar';
import { ROUTE } from '../constants/navigation';

export const ListItem = ({
  type,
  description,
  user,
  style,
  time,
  room,
  image,
}) => {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const navigate = () => {
    navigation.navigate(ROUTE.CHAT, { user, room, image });
  };

  return (
    <TouchableOpacity style={{ height: 80, ...style }} onPress={navigate}>
      <Grid style={{ maxHeight: 80 }}>
        <Col
          style={{ width: 80, alignItems: 'center', justifyContent: 'center' }}
        >
          <Avatar user={user} size={type === 'contacts' ? 40 : 65} />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ alignItems: 'center' }}>
            <Col>
              <Text
                style={{ fontWeight: 'bold', fontSize: 16, color: colors.text }}
              >
                {user.contactName || user.displayName}
              </Text>
            </Col>
            {time && (
              <Col style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: colors.secondaryText, fontSize: 11 }}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={{ color: colors.secondaryText, fontSize: 13 }}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};
