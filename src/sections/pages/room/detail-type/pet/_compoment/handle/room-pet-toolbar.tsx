import { LocateFixed } from 'lucide-react';
import { SetStateAction, useCallback } from 'react';
import { ToolButton } from 'src/sections/pages/room/_compoment/tool-button';
import { Camera, PetLayer } from 'src/shared/types/canvas';

interface ToolbarProps {
  camera: Camera;
  setCamera: (newCamera: SetStateAction<Camera>) => void;
  petCurrent?: PetLayer | null;
}

function RoomPetToolbar({ petCurrent, camera, setCamera }: ToolbarProps) {
  const LocationPet = useCallback(() => {
    if (!petCurrent) return;
    let x = petCurrent.x - (camera.width != undefined && camera.width > 0 ? camera.width / 2 : 0);
    let y = petCurrent.y - (camera.height != undefined && camera.height > 0 ? camera.height / 2 : 0);

    setCamera(() => ({
      ...camera,
      x: Math.floor(x),
      y: Math.floor(y),
    }));
  }, [petCurrent, setCamera, camera]);
  return (
    <div className="absolute left-[50%] -translate-x-[50%] buttom-2 flex flex-col gap-y-4">
      <div className="bg-[var(--bg-color)] rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton label="loction pet" icon={LocateFixed} onClick={LocationPet} isDisabled={!petCurrent} />
      </div>
    </div>
  );
}

export default RoomPetToolbar;
