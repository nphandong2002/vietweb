import { Metadata } from 'next';
import PetPage from 'src/sections/pages/pet';
export const metadata: Metadata = {
  title: 'Thú cưng của bạn',
};
function PetPageRoot() {
  return <PetPage />;
}

export default PetPageRoot;
