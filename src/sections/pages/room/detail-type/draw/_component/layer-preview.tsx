'use client';

import { memo } from 'react';

import { colorToCss } from 'src/lib/color';
import { useStorage } from 'src/liveblocks.config';
import { LayerType } from 'src/shared/types/canvas';

import { Path, Note, Ellipse, Rectangle, Text } from './layer';

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
  setEditText: (a: boolean) => void;
}

export const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor, setEditText }: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(id));
  if (!layer) return null;
  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : '#000'}
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          stroke={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <Note
          id={id}
          setEditText={setEditText}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Text:
      return (
        <Text
          setEditText={setEditText}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Ellipse:
      return <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />;
    case LayerType.Rectangle:
      return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />;
    default:
      console.warn('Unknown layer type');
      return null;
  }
});

LayerPreview.displayName = 'LayerPreview';
