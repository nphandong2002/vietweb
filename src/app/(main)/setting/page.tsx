import { Metadata } from 'next';

import SettingPage from 'src/sections/pages/setting';

export const metadata: Metadata = {
  title: 'Cài đặt',
};

function SettingPageRoot() {
  return <SettingPage />;
}

export default SettingPageRoot;
