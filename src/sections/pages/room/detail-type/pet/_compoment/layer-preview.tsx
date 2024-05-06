'use client';

import { useStorage } from 'src/liveblocks.config';

import LayerPetNor from './layer/layer-petnor';

import { petsNor } from '../config/config-pet-nor';

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
}

export const LayerPreview = ({ id, onLayerPointerDown }: LayerPreviewProps) => {
  const petLayer = useStorage((root) => root.petLayer.get(id));
  if (!petLayer) return null;

  const isPetNor = petsNor.some((pet) => pet == petLayer.type);
  return <>{isPetNor && <LayerPetNor layer={petLayer} />}</>;
};
