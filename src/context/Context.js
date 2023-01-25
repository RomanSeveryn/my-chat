import { createContext } from 'react';
import { theme } from '../utils/utils';

export const GlobalContext = createContext({
  theme,
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {},
});
