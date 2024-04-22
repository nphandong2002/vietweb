'use client';

import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';

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
import { useLocales } from 'src/locales';
import { login } from 'src/service/login';
import FormProvider from 'src/shared/context/form/form-provider';
import { loginValidate } from 'src/shared/validate/user-validate';

import RHFInput from '../hook-form/rhf-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormError } from '../hook-form/form-error';

function LoginModal() {
  const { t } = useLocales();
  const form = useForm({
    resolver: zodResolver(loginValidate),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const callbackUrl = window.location.href;

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      login(data, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((_) => {
          console.error(_);
          setError('Something went wrong');
        });
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t('login')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t('login')}</DialogTitle>
        </DialogHeader>
        <FormProvider methods={form} onSubmit={onSubmit}>
          <div className="flex flex-col items-center">
            <FormError message={error && t(error)} />
            <RHFInput name="username" placeholder={t('auth.username.placeholder')} />
            <RHFInput name="password" placeholder={t('auth.password.placeholder')} />
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="submit" variant="secondary" className="w-full mx-2">
              {t('login')}
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;