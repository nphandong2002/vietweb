import { useFormContext } from 'react-hook-form';

import { selectType } from 'src/shared/types/component';

import Each from '../each';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function RHFSelect({ placeholder, options, description, label, name }: selectType) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="px-2 py-3 w-full">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <Each
                of={options}
                render={(items) => <SelectItem value={items.value}>{items.label}</SelectItem>}
              />
            </SelectContent>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    ></FormField>
  );
}

export default RHFSelect;
