import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { defaultType } from 'src/shared/types/common';

import { CSSProperties } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
};

function FormUseContext({ children }: defaultType) {
  const context = useFormContext();
  let {
    formState: { errors },
  } = context;
  useEffect(() => {
    if (errors) {
      const elements = Object.keys(errors)
        .map((name) => document.getElementsByName(name)[0])
        .filter((el) => !!el);
      elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

      if (elements.length > 0) {
        const errorElement = elements[0];
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus({ preventScroll: true });
      }
    }
  }, [errors]);
  return <>{children}</>;
}

export default function FormProvider({ children, methods, onSubmit, style }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} style={style} className="w-full grow">
        <FormUseContext>{children}</FormUseContext>
      </form>
    </Form>
  );
}
