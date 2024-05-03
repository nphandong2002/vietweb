'use client';

import { useEffect, useState } from 'react';
import { useStorage } from 'src/liveblocks.config';
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

  useEffect(() => {
    if (!layer || divInfo.url) return; // Check if layer is falsy or if divInfo.url already exists
    const loadImg = () => {
      var r = new Image();
      let n = {
        ...divInfo,
        url: `/assets/pet/${pathPet[layer.type][layer.size]}`,
        cols: layer.col,
        rows: layer.row,
      };
      r.src = n.url;
      r.addEventListener(
        'load',
        () => {
          n.sheetWidth = r.width;
          n.sheetHeight = r.height;
          n.frameWidth = n.sheetWidth / n.cols / n.downsizeRatio;
          n.frameHeight = n.sheetHeight / n.rows / n.downsizeRatio;
          n.totalSprites = n.cols * n.rows - n.cutOffFrames;
          setdivInfo(n);
        },
        false,
      );
    };
    loadImg();
  }, [setdivInfo, layer, divInfo]);
  return (
    <foreignObject width={divInfo.frameWidth} height={divInfo.frameHeight}>
      <div
        style={{
          backgroundImage: `url(${divInfo.url})`,
          width: `${divInfo.frameWidth}px`,
          height: `${divInfo.frameHeight}px`,
        }}
      >
        {id}
      </div>
    </foreignObject>
  );
};
