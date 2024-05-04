import { useFormContext } from 'react-hook-form';

import { rhfGroupRadioType } from 'src/shared/types/component';

import { FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Each from '../each';
import { cn } from 'src/lib/utils';

function RHFGroupRadio({ name, label, description, options, className, labelInChild }: rhfGroupRadioType) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="px-2  w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('flex flex-col space-y-1', className)}
            >
              <Each
                of={options}
                render={(op) => (
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl className={cn(labelInChild && 'hidden')}>
                      <RadioGroupItem value={op.value} />
                    </FormControl>
                    <FormLabel className={cn('font-normal', labelInChild && field.value === op.value && 'active')}>
                      {op.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default RHFGroupRadio;
