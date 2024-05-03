import { PetType } from 'src/shared/types/canvas';
import { pathPet } from './path-pet';
import Image from 'next/image';

function PetInfo() {
  const pets = [PetType.Calico, PetType.Glay, PetType.Black, PetType.Tabby, PetType.White];
  return (
    <div className="absolute top-2 left-[4.25rem] bg-[var(--bg-color)] rounded-md px-1.5 h-12 flex items-center shadow-md">
      {pets.map((pet) => (
        <div>
          <Image src={`/assets/pet/heads/${pathPet[pet].header}`} alt={pet.toString()} width="64" height="64" />
        </div>
      ))}
    </div>
  );
}

export default PetInfo;
