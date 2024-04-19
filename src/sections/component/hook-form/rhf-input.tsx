import { useFormContext } from 'react-hook-form';

import { rhfInputType } from 'src/shared/types/component';

import Each from '../each';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

function RHFInput({ label, name, description, placeholder }: rhfInputType) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="px-2  w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} onChange={field.onChange} value={field.value} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}

export default RHFInput;
