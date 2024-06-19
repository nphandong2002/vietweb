'use client';

import { Layer } from '@pixi/layers';
import { Spine } from '@pixi-spine/loader-uni';
import { useEffect, useRef, useState } from 'react';
import { Application, Assets, LoaderParser, Container } from 'pixi.js';

import { spineLoaderExtension, spineTextureAtlasLoader } from '../../pet-utils';
import { renderMaganerType, resourcesType } from '../../pet-type';
import { action, action2, feeling } from '../../config/config-pet';

interface LayerPetType {
  skinName: string;
}

function LayerPet({ skinName }: LayerPetType) {
  const divRef = useRef<HTMLDivElement>(null);
  const [resources, setresources] = useState<resourcesType>({
    spineData: [],
    spineAtlas: {},
  });
  Assets.loader.parsers.push(spineTextureAtlasLoader.loader as LoaderParser);
  Assets.loader.parsers.push(spineLoaderExtension.loader as LoaderParser);

  useEffect(() => {}, [divRef, skinName]);
  useEffect(() => {
    Assets.add('cat', '/assets/pet/spine/cat.json');
    Assets.load(['cat']).then(function (a) {
      setresources(a);
    });
  }, []);
  return <div ref={divRef}></div>;
}

export default LayerPet;
