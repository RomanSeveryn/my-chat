import { Text, View } from 'native-base';
import { auth, db } from '../../firebase';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/Context';
import { collection, onSnapshot, query, where } from '@firebase/firestore';
import { ContactsFloatingIcon } from '../components/ContactsFloatingIcon';
import { useContacts } from '../hooks/useContacts';

export const Chats = () => {
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();
  const chatsQuery = query(
    collection(db, 'rooms'),
    where('participantsArray', 'array-contains', currentUser.email),
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }
  return (
    <View flex={1} p={5} pr={10}>
      <Text>Chats</Text>
      <ContactsFloatingIcon />
    </View>
  );
};
