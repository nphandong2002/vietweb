import { defaultType } from 'src/shared/types/common';
import { RoomDetailContext } from './room-detail-context';
import { RoomDetailContextProps } from '../type-room';

function RoomDetailProvider({ children }: defaultType) {
  return (
    <RoomDetailContext.Provider value={{} as RoomDetailContextProps}>
      {children}
    </RoomDetailContext.Provider>
  );
}

export default RoomDetailProvider;
