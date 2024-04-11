import { Metadata } from 'next';

import HomePage from 'src/sections/pages/home';

export const metadata: Metadata = {
  title: 'Trang chủ',
};

function HomePageRoot() {
  return <HomePage />;
}

export default HomePageRoot;
