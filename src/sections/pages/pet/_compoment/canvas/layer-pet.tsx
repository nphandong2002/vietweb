'use client';

import { useEffect, useMemo, useState } from 'react';
import { configCatPro } from '../../config/config-pet-position';
import { VTri } from '../../config/config-pet-aliat';
import { loadAliat } from '../../pet-utils';

interface LayerPetType {
  skinName: string;
}

function LayerPet({ skinName }: LayerPetType) {
  const [skins, setskins] = useState();
  const [cat, setcat] = useState({
    spineAtlas: {},
    spineData: {},
  });
  // console.log(configPet);
  useEffect(() => {
    console.log(cat);
  }, [cat]);
  useEffect(() => {
    const loadConfig = async () => {
      const aliat = await loadAliat(VTri);
      setcat({
        spineAtlas: aliat,
        spineData: {},
      });
    };
    loadConfig();
  }, [setcat, VTri, loadAliat]);
  return <canvas />;
}

export default LayerPet;
