import Context from 'react-native/Libraries/Image/ImageAnalyticsTagContext';
import { theme } from '../utils/utils';
import { useState } from 'react';

export const ContextWrapper = (children) => {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);
  return (
    <Context.Provider
      value={{ theme, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {children}
    </Context.Provider>
  );
};
