'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/sections/component/ui/tabs';
import { PetTabSkin } from './pet-tab';
import { useLocales } from 'src/locales';

function PetTabsInfo() {
  const { t } = useLocales();
  return (
    <Tabs defaultValue="skin">
      <TabsList>
        <TabsTrigger value="skin">{t('pet.skin')}</TabsTrigger>
      </TabsList>
      <TabsContent value="skin">
        <PetTabSkin />
      </TabsContent>
    </Tabs>
  );
}

export default PetTabsInfo;
