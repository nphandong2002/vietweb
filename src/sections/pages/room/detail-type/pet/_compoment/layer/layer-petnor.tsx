import { PetLayer } from 'src/shared/types/canvas';
import { petsNor } from '../../config/config-pet-nor';

function LayerPetNor({ layer }: { layer: PetLayer }) {
  const { type } = layer;
  const configPet = petsNor.find((pet) => pet === type);
  if (!configPet) return null;
  return <></>;
}

export default LayerPetNor;
