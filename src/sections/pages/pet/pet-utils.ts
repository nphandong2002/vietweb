import { ISkeletonData, ISkeletonParser, TextureAtlas, BinaryInput } from '@pixi-spine/base';
import { type AssetExtension, LoaderParserPriority, LoadAsset, Loader, checkExtension } from '@pixi/assets';
import { BaseTexture, ExtensionType, settings, utils } from '@pixi/core';
import type { ISpineMetadata } from '@pixi-spine/loader-base';
import { ISpineResource } from '@pixi-spine/loader-base';
import * as spine38 from '@pixi-spine/runtime-3.8';
import * as spine37 from '@pixi-spine/runtime-3.7';
import * as spine41 from '@pixi-spine/runtime-4.1';
import { SPINE_VERSION, detectSpineVersion } from './versions';

type RawAtlas = string;

export const spineTextureAtlasLoader: AssetExtension<RawAtlas | TextureAtlas, ISpineMetadata> = {
  extension: ExtensionType.Asset,
  loader: {
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal,
    },
    test(url: string): boolean {
      return checkExtension(url, '.atlas');
    },
    async load(url: string): Promise<RawAtlas> {
      const response = await settings.ADAPTER.fetch(url);
      const txt = await response.text();
      return txt as RawAtlas;
    },

    testParse(asset: unknown, options: LoadAsset): Promise<boolean> {
      const isExtensionRight = checkExtension(options.src, '.atlas');
      const isString = typeof asset === 'string';
      return Promise.resolve(isExtensionRight && isString);
    },

    async parse(asset: RawAtlas, options: LoadAsset, loader: Loader): Promise<TextureAtlas> {
      const metadata: ISpineMetadata = options.data;
      let basePath = utils.path.dirname(options.src);
      if (basePath && basePath.lastIndexOf('/') !== basePath.length - 1) basePath += '/';
      let resolve = (value: TextureAtlas | PromiseLike<TextureAtlas>) => {};
      let reject = (reason?: any) => {};
      const retPromise = new Promise<TextureAtlas>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      let retval = new TextureAtlas();
      const resolveCallback = (newAtlas: TextureAtlas): void => {
        if (!newAtlas)
          reject('Something went terribly wrong loading a spine .atlas file\nMost likely your texture failed to load.');
        resolve(retval);
      };
      if (metadata.image || metadata.images) {
        const pages = Object.assign(metadata.image ? { default: metadata.image } : {}, metadata.images);
        retval = new TextureAtlas(
          asset as RawAtlas,
          (line: any, callback: any) => {
            const page = (pages[line] as any) || (pages.default as any);
            if (page && page.baseTexture) callback(page.baseTexture);
            else callback(page);
          },
          resolveCallback,
        );
      } else {
        retval = new TextureAtlas(
          asset as RawAtlas,
          makeSpineTextureAtlasLoaderFunctionFromPixiLoaderObject(loader, basePath, metadata.imageMetadata),
          resolveCallback,
        );
      }
      return (await retPromise) as TextureAtlas;
    },
    unload(atlas: TextureAtlas) {
      atlas.dispose();
    },
  },
} as AssetExtension<RawAtlas | TextureAtlas, ISpineMetadata>;

export const makeSpineTextureAtlasLoaderFunctionFromPixiLoaderObject = (
  loader: Loader,
  atlasBasePath: string,
  imageMetadata: any,
) => {
  return async (pageName: string, textureLoadedCallback: (tex: BaseTexture) => any): Promise<void> => {
    const url = utils.path.normalize([...atlasBasePath.split(utils.path.sep), pageName].join(utils.path.sep));
    const texture = await loader.load({ src: url, data: imageMetadata });
    textureLoadedCallback(texture.baseTexture);
  };
};

type SPINEJSON = any;
type SPINEBINARY = ArrayBuffer;
function isJson(resource: any): resource is SPINEJSON {
  return resource.hasOwnProperty('bones');
}

function isBuffer(resource: unknown): resource is SPINEBINARY {
  return resource instanceof ArrayBuffer;
}
class UniBinaryParser implements ISkeletonParser {
  scale = 1;
  readSkeletonData(atlas: TextureAtlas, dataToParse: Uint8Array): ISkeletonData {
    let parser: any = null;
    let version = this.readVersionOldFormat(dataToParse);
    let ver = detectSpineVersion(version);
    if (ver === SPINE_VERSION.VER38) parser = new spine38.SkeletonBinary(new spine38.AtlasAttachmentLoader(atlas));
    version = this.readVersionNewFormat(dataToParse);
    ver = detectSpineVersion(version);
    if (ver === SPINE_VERSION.VER40 || ver === SPINE_VERSION.VER41)
      parser = new spine41.SkeletonBinary(new spine41.AtlasAttachmentLoader(atlas));
    if (!parser) console.error(`Unsupported version of spine model ${version}, please update pixi-spine`);
    parser.scale = this.scale;
    return parser.readSkeletonData(dataToParse);
  }

  readVersionOldFormat(dataToParse: Uint8Array) {
    const input = new BinaryInput(dataToParse);
    let version;
    try {
      input.readString();
      version = input.readString();
    } catch (e) {
      version = '';
    }

    return version || '';
  }

  readVersionNewFormat(dataToParse: Uint8Array) {
    const input = new BinaryInput(dataToParse);
    input.readInt32();
    input.readInt32();
    let version;
    try {
      version = input.readString();
    } catch (e) {
      version = '';
    }
    return version || '';
  }
}

class UniJsonParser implements ISkeletonParser {
  scale = 1;
  readSkeletonData(atlas: TextureAtlas, dataToParse: any): ISkeletonData {
    const version = dataToParse.skeleton.spine;
    const ver = detectSpineVersion(version);
    let parser: any = null;
    if (ver === SPINE_VERSION.VER37) parser = new spine37.SkeletonJson(new spine37.AtlasAttachmentLoader(atlas));
    if (ver === SPINE_VERSION.VER38) parser = new spine38.SkeletonJson(new spine38.AtlasAttachmentLoader(atlas));
    if (ver === SPINE_VERSION.VER40 || ver === SPINE_VERSION.VER41)
      parser = new spine41.SkeletonJson(new spine41.AtlasAttachmentLoader(atlas));
    if (!parser) console.error(`Unsupported version of spine model ${version}, please update pixi-spine`);
    parser.scale = this.scale;
    return parser.readSkeletonData(dataToParse);
  }
}
const parseData = (parser: ISkeletonParser, atlas: TextureAtlas, dataToParse: any): ISpineResource<ISkeletonData> => {
  const parserCast = parser as UniBinaryParser | UniJsonParser;

  return {
    spineData: parserCast.readSkeletonData(atlas, dataToParse),
    spineAtlas: atlas,
  };
};
export const spineLoaderExtension: AssetExtension<
  SPINEJSON | SPINEBINARY | ISpineResource<ISkeletonData>,
  ISpineMetadata
> = {
  extension: ExtensionType.Asset,
  loader: {
    extension: {
      type: ExtensionType.LoadParser,
      priority: LoaderParserPriority.Normal,
    },
    test(url) {
      return checkExtension(url, '.skel');
    },

    async load<SPINEBINARY>(url: string): Promise<SPINEBINARY> {
      const response = await settings.ADAPTER.fetch(url);
      const buffer = await response.arrayBuffer();
      return buffer as SPINEBINARY;
    },

    testParse(asset: unknown, options: LoadAsset): Promise<boolean> {
      const isJsonSpineModel = checkExtension(options.src, '.json') && isJson(asset);
      const isBinarySpineModel = checkExtension(options.src, '.skel') && isBuffer(asset);
      const isMetadataAngry = options.data?.spineAtlas === false;
      return Promise.resolve((isJsonSpineModel && !isMetadataAngry) || isBinarySpineModel);
    },
    async parse(
      asset: SPINEJSON | SPINEBINARY,
      loadAsset: LoadAsset,
      loader: any,
    ): Promise<ISpineResource<ISkeletonData>> {
      const fileExt = utils.path.extname(loadAsset.src).toLowerCase();
      const fileName = utils.path.basename(loadAsset.src, fileExt);
      let basePath = utils.path.dirname(loadAsset.src);

      if (basePath && basePath.lastIndexOf('/') !== basePath.length - 1) basePath += '/';
      const isJsonSpineModel = checkExtension(loadAsset.src, '.json') && isJson(asset);
      let parser: ISkeletonParser = new UniBinaryParser();
      let dataToParse = asset;
      if (isJsonSpineModel) parser = new UniJsonParser();
      else dataToParse = new Uint8Array(asset);
      const metadata = (loadAsset.data || {}) as ISpineMetadata;
      const metadataSkeletonScale = metadata?.spineSkeletonScale ?? null;
      if (metadataSkeletonScale) parser.scale = metadataSkeletonScale;
      const metadataAtlas: TextureAtlas = metadata.spineAtlas as TextureAtlas;
      if (metadataAtlas && metadataAtlas.pages) return parseData(parser, metadataAtlas, dataToParse);

      const textAtlas = metadata.atlasRawData;

      if (textAtlas) {
        let auxResolve = (value: TextureAtlas | PromiseLike<TextureAtlas>) => {};
        let auxReject = (reason?: any) => {};
        const atlasPromise = new Promise<TextureAtlas>((resolve, reject) => {
          auxResolve = resolve;
          auxReject = reject;
        });
        const atlas = new TextureAtlas(
          textAtlas,
          makeSpineTextureAtlasLoaderFunctionFromPixiLoaderObject(loader, basePath, metadata.imageMetadata),
          (newAtlas) => {
            if (!newAtlas) {
              auxReject(
                'Something went terribly wrong loading a spine .atlas file\nMost likely your texture failed to load.',
              );
            }
            auxResolve(atlas);
          },
        );
        const textureAtlas = await atlasPromise;
        return parseData(parser, textureAtlas, dataToParse);
      }

      let atlasPath = metadata.spineAtlasFile;
      if (!atlasPath) atlasPath = `${basePath + fileName}.atlas`;

      const textureAtlas = await loader.load({
        src: atlasPath,
        data: metadata,
        alias: metadata.spineAtlasAlias,
      });

      return parseData(parser, textureAtlas, dataToParse);
    },
  },
} as AssetExtension<SPINEJSON | SPINEBINARY | ISpineResource<ISkeletonData>, ISpineMetadata>;
