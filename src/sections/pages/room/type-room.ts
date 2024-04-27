import { Camera, CanvasMode } from 'src/shared/types/canvas';

export type RoomDetailContextProps = {
  data: {
    camera: Camera;
    canvasState: CanvasMode;
    canUndo: Boolean;
    canRedo: Boolean;
  };
  action: {};
};
