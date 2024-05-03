import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { cn } from 'src/lib/utils';
import { useMutation } from 'src/liveblocks.config';
import { NoteLayer } from 'src/shared/types/canvas';
import { colorToCss, getContrastingTextColor } from 'src/lib/color';
import { useEffect } from 'react';

const font = Kalam({ subsets: ['latin'], weight: '400' });

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
  setEditText: (a: boolean) => void;
}

export const Note = ({ layer, onPointerDown, id, selectionColor, setEditText }: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers');

    liveLayers.get(id)?.set('value', newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };
  const deleteLayer = useMutation(({ storage }) => {
    const liveLayers = storage.get('layers');
    const liveLayersIds = storage.get('layerIds');

    liveLayers.delete(id);
    const index = liveLayersIds.indexOf(id);

    if (index !== -1) liveLayersIds.delete(index);
  }, []);
  const onBlur = (e: any) => {
    if (!e.target.textContent) deleteLayer();
    setEditText(false);
  };
  useEffect(() => {
    setEditText(true);
  }, [setEditText]);
  return (
    <foreignObject
      x={x}
      y={y}
      height={height}
      width={width}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCss(fill) : '#000',
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || ''}
        onChange={handleContentChange}
        onFocus={() => setEditText(true)}
        onBlur={onBlur}
        className={cn('h-full w-full flex items-center justify-center outline-none', font.className)}
        style={{
          color: fill ? getContrastingTextColor(fill) : '#000',
          fontSize: calculateFontSize(width, height),
        }}
      />
    </foreignObject>
  );
};
