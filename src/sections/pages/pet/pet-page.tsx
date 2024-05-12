'use client';

import { useForm } from 'react-hook-form';

import { useLocales } from 'src/locales';
import FormProvider from 'src/shared/context/form/form-provider';
import RHFInput from 'src/sections/component/hook-form/rhf-input';

import PetTabsInfo from './_compoment/tabs/pet-tabs';

function PetPage() {
  const { t } = useLocales();

  const form = useForm();
  const onSubmit = form.handleSubmit((data) => {});
  return (
    <div className="bg-[var(--bg-color)] rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
      <FormProvider methods={form} onSubmit={onSubmit}>
        <RHFInput name="namePet" placeholder={t('pet.name_pet.placeholder')} />
        <PetTabsInfo />
      </FormProvider>
    </div>
  );
}

export default PetPage;
