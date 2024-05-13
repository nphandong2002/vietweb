'use client';

import { useMemo, useState } from 'react';
import { configCatPro } from '../../config/config-pet-position';

interface LayerPetType {
  skinName: string;
}

function LayerPet({ skinName }: LayerPetType) {
  const [skins, setskins] = useState();
  //   const skin = useMemo(() => {
  //     configCatPro.
  //   },[skinName]);
  return <canvas />;
}

export default LayerPet;
