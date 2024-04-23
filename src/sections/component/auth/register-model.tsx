'use client';

import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLocales } from 'src/locales';
import { register } from 'src/service/register';
import FormProvider from 'src/shared/context/form/form-provider';
import { registerValidate } from 'src/shared/validate/user-validate';

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from '../ui/dialog';
import { Button } from '../ui/button';
import RHFInput from '../hook-form/rhf-input';
import { FormError } from '../hook-form/form-error';

function RegisterModal() {
  const { t } = useLocales();
  const form = useForm({
    resolver: zodResolver(registerValidate),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const onSubmit = form.handleSubmit((data) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      register(data)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch((_) => {
          setError('messages_app.errors.wrong');
        });
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t('register')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t('register')}</DialogTitle>
        </DialogHeader>
        <FormProvider methods={form} onSubmit={onSubmit}>
          <div className="flex flex-col items-center">
            <FormError message={error && t(error)} />

            <RHFInput
              name="username"
              disabled={isPending}
              placeholder={t('auth.username.placeholder')}
            />
            <RHFInput
              name="password"
              disabled={isPending}
              type="password"
              placeholder={t('auth.password.placeholder')}
            />
            <RHFInput name="name" disabled={isPending} placeholder={t('auth.name.placeholder')} />
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="submit" variant="secondary" className="w-full mx-2">
              {t('register')}
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
