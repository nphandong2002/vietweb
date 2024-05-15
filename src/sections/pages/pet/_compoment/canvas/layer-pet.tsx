'use client';

import { useMemo, useState } from 'react';
import { configCatPro } from '../../config/config-pet-position';
import { VTri } from '../../config/config-pet-aliat';

interface LayerPetType {
  skinName: string;
}

function LayerPet({ skinName }: LayerPetType) {
  const [skins, setskins] = useState();
  // const configPet = readConfig(VTri);
  // console.log(configPet);

  //   const skin = useMemo(() => {
  //     configCatPro.
  //   },[skinName]);
  return <canvas />;
}

export default LayerPet;
