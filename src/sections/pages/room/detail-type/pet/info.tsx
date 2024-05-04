import { z } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { LiveObject } from '@liveblocks/client';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLocales } from 'src/locales';
import uuidv4 from 'src/shared/utils/uuidv4';
import { useMutation, useSelf, useStorage } from 'src/liveblocks.config';
import { Button } from 'src/sections/component/ui/button';
import FormProvider from 'src/shared/context/form/form-provider';
import RHFInput from 'src/sections/component/hook-form/rhf-input';
import RHFGroupRadio from 'src/sections/component/hook-form/rhf-groupRadio';

import { PetType } from './type-pet';
import { configPetNor } from './config-pet-nor';
import { initPet } from './config-pet-common';

function PetInfo() {
  const self = useSelf();
  const { t } = useLocales();
  const idPets = useStorage((r) => r.petLayer);
  const idCurrent = useMemo(
    () => Array.from(idPets.keys()).find((a) => a.startsWith(`pet_${self.id}`)),
    [self, idPets],
  );
  const petCurrent = useMemo(() => (idCurrent ? idPets.get(idCurrent) : null), [idCurrent, idPets]);
  const pets = [PetType.Calico, PetType.Glay, PetType.Black, PetType.Tabby, PetType.White];

  const form = useForm({
    resolver: zodResolver(
      z.object({
        namePet: z.string().min(1),
        typePet: z.any(),
      }),
    ),
    defaultValues: {
      namePet: '',
      typePet: PetType.Calico,
    },
  });
  useEffect(() => {
    form.reset({
      namePet: petCurrent?.name ?? '',
      typePet: petCurrent?.type ?? PetType.Calico,
    });
  }, [petCurrent, form]);
  const handlePetCurrent = useMutation(
    ({ storage, self }, { namePet, typePet }: { namePet: string; typePet: PetType }) => {
      let idPets = storage.get('petLayer');
      let liveLayerIds = storage.get('layerIds');
      let idCurrent = Array.from(idPets.keys()).find((a) => a.startsWith(`pet_${self.id}`));

      if (!idCurrent) {
        idCurrent = `pet_${self.id}_${uuidv4()}`;

        let pet = new LiveObject({
          ...initPet,
          type: typePet,
          name: namePet,
        });
        liveLayerIds.push(idCurrent);
        idPets.set(idCurrent, pet);
      } else {
        let pet = idPets.get(idCurrent);
        pet?.update({
          ...pet,
          type: typePet,
          name: namePet,
        });
      }
    },
    [],
  );
  const onSubmit = form.handleSubmit((data) => {
    handlePetCurrent(data);
  });
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-[var(--bg-color)] rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <FormProvider methods={form} onSubmit={onSubmit}>
          <RHFInput name="namePet" placeholder={t('room_pet.name_pet.placeholder')} />
          <RHFGroupRadio
            name="typePet"
            labelInChild
            className="grid  grid-cols-2"
            options={pets.map((pet) => ({
              value: pet,
              label: (
                <div>
                  <Image src={configPetNor[pet].header} alt={pet.toString()} width="64" height="64" />
                </div>
              ),
            }))}
          />
          <Button type="submit">{t('add')}</Button>
        </FormProvider>
      </div>
    </div>
  );
}

export default PetInfo;
