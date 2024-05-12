import RHFGroupRadio from 'src/sections/component/hook-form/rhf-groupRadio';
import Image from 'src/sections/component/image';
import { listPetPro } from '../../config/config-pet';

export function PetTabSkin() {
  return (
    <div>
      <RHFGroupRadio
        name="skinPet"
        labelInChild
        className="grid grid-cols-10"
        options={listPetPro.map((pet) => ({
          value: pet.id,
          label: (
            <div>
              <Image src={`/assets/pet/skins/${pet.preview_loc}`} alt={pet.toString()} width="64" height="64" />
            </div>
          ),
        }))}
      />
    </div>
  );
}
