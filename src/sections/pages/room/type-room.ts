import { Camera, CanvasState, Color } from 'src/shared/types/canvas';

export type RoomDetailContextProps = {
  state: RoomDetailData;
  dispatch: React.Dispatch<RoomDetailActions>;
};
export type RoomDetailData = {
  camera: Camera;
  canvasState: CanvasState;
  lastUsedColor: Color;
  layerIds: readonly string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
};
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export enum RoomDetailTypeAction {
  SetCanvasState = 'SET_CANVAS_STATE',
  SetCamera = 'SET_CAMERA',
  Add = 'ADD_PRODUCT',
}
export type RoomDetailPaylaod = {
  [RoomDetailTypeAction.SetCanvasState]: CanvasState;
  [RoomDetailTypeAction.SetCamera]: Camera;
};
export type RoomDetailActions = ActionMap<RoomDetailPaylaod>[keyof ActionMap<RoomDetailPaylaod>];
