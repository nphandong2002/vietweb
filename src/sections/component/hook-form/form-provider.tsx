import { CSSProperties } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
};

export default function FormProvider({ children, methods, onSubmit, style }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} style={style} className="w-full grow">
        {children}
      </form>
    </Form>
  );
}
