'use client';

import { useEffect, useState } from 'react';
import { useStorage } from 'src/liveblocks.config';
import { PetLayer, PetType, SizePet } from 'src/shared/types/canvas';
import { pathPet } from './path-pet';

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
}

interface infoDiv {
  loaded?: boolean;
  url?: string;
  cols?: number;
  rows?: number;
  cutOffFrames: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  startSprite?: number;
  downsizeRatio: number;
  totalSprites?: number;
  sheetWidth?: number;
  sheetHeight?: number;
  frameWidth?: number;
  frameHeight?: number;
  animations?: Animations;
  onLoaded?: null;
}

interface Animations {}
export const LayerPreview = ({ id, onLayerPointerDown }: LayerPreviewProps) => {
  const layer = useStorage((root) => root.petLayer.get(id));
  const [divInfo, setdivInfo] = useState<infoDiv>({
    loaded: !1,
    cutOffFrames: 0,
    startSprite: 1,
    downsizeRatio: 1,
    totalSprites: 0,
    sheetWidth: 0,
    sheetHeight: 0,
    frameWidth: 0,
    frameHeight: 0,
    animations: {},
    onLoaded: null,
  });
  if (!layer) return <div>none</div>;
  const typePet = layer.type;
  const infoPet = {
    url: `/assets/pet/${pathPet[typePet][layer.size]}`,
    cols: layer.col,
    rows: layer.row,
  };

  useEffect(() => {
    var r = new Image();
    r.src = infoPet.url;
    const loadImg = () => {
      let n = {
        ...divInfo,
        ...infoPet,
      };
      n.sheetWidth = r.width;
      n.sheetHeight = r.height;
      n.frameWidth = n.sheetWidth / n.cols / n.downsizeRatio;
      n.frameHeight = n.sheetHeight / n.rows / n.downsizeRatio;
      n.totalSprites = n.cols * n.rows - n.cutOffFrames;
      setdivInfo(n);
    };
    r.addEventListener('load', loadImg, false);
    return r.removeEventListener('load', loadImg);
  }, [infoPet, setdivInfo]);
  return (
    <foreignObject width={divInfo.frameWidth} height={divInfo.frameHeight}>
      <div
        style={{
          backgroundImage: `url(${infoPet.url})`,
          width: `${divInfo.frameWidth}px`,
          height: `${divInfo.frameHeight}px`,
        }}
      >
        {id}
      </div>
    </foreignObject>
  );
};
