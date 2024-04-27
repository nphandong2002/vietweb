import { createContext, useContext } from 'react';
import { RoomDetailContextProps } from '../type-room';

export const RoomDetailContext = createContext({} as RoomDetailContextProps);
export const useRoomDetailContext = () => {
  const context = useContext(RoomDetailContext);
  if (!context) throw new Error('useRoomDetailContext must be use inside RoomDetailProvider');
  return context;
};
