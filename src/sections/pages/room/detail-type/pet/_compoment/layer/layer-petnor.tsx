import { useEffect, useMemo, useState } from 'react';

import { PetLayer } from 'src/shared/types/canvas';

import { animations, configPetNor } from '../../config/config-pet-nor';

function LayerPetNor({
  layer,
  onPointerDown,
  id,
  isBoss,
}: {
  layer: PetLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  id: string;
  isBoss: boolean;
}) {
  const { type, x, y, work, name, height, width } = layer;
  const configPet = configPetNor[type];
  const spriteSheet = animations[work];
  const startcurrentFrame = spriteSheet.length - 1;
  const [currentFrame, setcurrentFrame] = useState<number>(startcurrentFrame);

  useEffect(() => {
    if (!configPet) return;
    setTimeout(() => {
      setcurrentFrame((cF) => {
        let c = cF;
        c += 1;
        c = c++ % spriteSheet.length;
        return c;
      });
    }, 500);
  }, [currentFrame, setcurrentFrame, configPet, spriteSheet.length]);

  const position = useMemo(() => {
    const script = spriteSheet[currentFrame];
    if (!script || !configPet) return '0 0';
    var o = Math.ceil(Number(script.sprite) / configPet.cols),
      s = Number(script.sprite) - (o - 1) * configPet.cols,
      a = (s - 1) * configPet.frameWidth * -1,
      l = (o - 1) * configPet.frameHeight * -1;
    return `${a}px ${l}px`;
  }, [currentFrame, configPet, spriteSheet]);

  if (!configPet) return null;

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        cursor: isBoss ? 'grab' : 'default',
      }}
      onPointerDown={(e) => (isBoss ? onPointerDown(e, id) : null)}
      height={height}
      width={width}
    >
      <div className="w-full h-full flex flex-col items-center">
        <span>{name}</span>
        <div
          style={{
            backgroundImage: `url('${configPet[0]}')`,
            height: configPet.frameHeight,
            width: configPet.frameWidth,
            backgroundPosition: position,
          }}
        ></div>
      </div>
    </foreignObject>
  );
}

export default LayerPetNor;
