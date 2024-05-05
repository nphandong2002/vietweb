'use client';

import { useStorage } from 'src/liveblocks.config';
import { petsNor } from '../config/config-pet-nor';
import LayerPetNor from './layer/layer-petnor';

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
}

interface Animations {}
export const LayerPreview = ({ id, onLayerPointerDown }: LayerPreviewProps) => {
  const layer = useStorage((root) => root.petLayer.get(id));
  if (!layer) return null;

  const isPetNor = petsNor.some((pet) => pet == layer.type);
  return <div>{isPetNor && <LayerPetNor layer={layer} />}</div>;
};
