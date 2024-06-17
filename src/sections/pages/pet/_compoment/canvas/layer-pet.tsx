'use client';

import { Application, Assets, DisplayObject, ExtensionType, Renderer, extensions } from 'pixi.js';
import { Layer } from '@pixi/layers';

import { useEffect, useRef } from 'react';
import { spineLoaderExtension, spineTextureAtlasLoader } from '../../pet-utils';

interface LayerPetType {
  skinName: string;
}

function LayerPet({ skinName }: LayerPetType) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadConfig = async () => {
      let pgWorld = new Application();
      Object.assign(DisplayObject.prototype, {
        parentLayer: null,
        _activeParentLayer: null,
        parentGroup: null,
        zOrder: 0,
        zIndex: 0,
        updateOrder: 0,
        displayOrder: 0,
        layerableChildren: !0,
        isLayer: !1,
      });
      pgWorld.stage = new Layer();
      pgWorld.renderer.plugins.interaction.autoPreventDefault = false;
      pgWorld.renderer.view.style && (pgWorld.renderer.view.style.touchAction = 'auto');
      pgWorld.ticker && (pgWorld.ticker.maxFPS = 60);
      extensions.add(spineTextureAtlasLoader);
      extensions.add(spineLoaderExtension);

      console.log(extensions);
      Assets.add('cat', '/assets/pet/spine/cat.json');
      Assets.load(['cat'], function (a) {
        console.log(a);
      });
    };
    loadConfig();
  }, [skinName, divRef]);
  return <div ref={divRef}></div>;
}

export default LayerPet;
