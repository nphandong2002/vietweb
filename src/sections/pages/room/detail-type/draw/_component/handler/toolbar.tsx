import { Circle, MousePointer2, Pencil, Redo2, SlidersHorizontal, Square, StickyNote, Type, Undo2 } from 'lucide-react';

import { Skeleton } from 'src/sections/component/ui/skeleton';
import { CanvasMode, CanvasState, LayerType } from 'src/shared/types/canvas';

import { ToolButton } from '../../../../_compoment/tool-button';
import PopoverCustom from 'src/sections/component/popover/popover';
import { Label } from 'src/sections/component/ui/label';
import { ColorPicker } from './color-picker';
import { Popover, PopoverContent, PopoverTrigger } from 'src/sections/component/ui/popover';

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({ canvasState, setCanvasState, undo, redo, canRedo, canUndo }: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-[var(--bg-color)] rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text}
        />
        <ToolButton
          label="Sticky note"
          icon={StickyNote}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            });
          }}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            });
          }}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            });
          }}
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse}
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
        <Popover>
          <PopoverTrigger>
            <ToolButton label="setting" icon={SlidersHorizontal} />
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="grid gap-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Color</Label>
                <ColorPicker onChange={() => {}} />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="bg-[var(--bg-color)] rounded-md gap-y-1 p-1.5 flex flex-col items-center shadow-md">
        <ToolButton label="Undo" icon={Undo2} onClick={undo} isDisabled={!canUndo} />
        <ToolButton label="Redo" icon={Redo2} onClick={redo} isDisabled={!canRedo} />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 h-[360px] w-[52px] rounded-md">
      <Skeleton className="h-full w-full bg-neutral-200" />
    </div>
  );
};
