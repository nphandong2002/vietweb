import { Metadata } from 'next';
import NewVerificationPage from 'src/sections/pages/new-verification';

export const metadata: Metadata = {
  title: 'Xác nhận email',
};

function NewVerificationPageRoot() {
  return <NewVerificationPage />;
}

export default NewVerificationPageRoot;
