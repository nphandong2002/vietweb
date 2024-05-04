'use client';

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
}

interface Animations {}
export const LayerPreview = ({ id, onLayerPointerDown }: LayerPreviewProps) => {
  return <div></div>;
};
