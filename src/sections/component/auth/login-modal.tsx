'use client';

import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLocales } from 'src/locales';
import { login } from 'src/service/login';
import { MESSAGE } from 'src/shared/constain/message';
import FormProvider from 'src/shared/context/form/form-provider';
import { loginValidate } from 'src/shared/validate/user-validate';

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
import { FormSuccess } from '../hook-form/form-success';

function LoginModal() {
  const { t } = useLocales();
  const form = useForm({
    resolver: zodResolver(loginValidate),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const callbackUrl = usePathname();

  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const onSubmit = form.handleSubmit((data) => {
    setError('');
    setSuccess('');
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
          if (data?.twoFactor) setShowTwoFactor(true);
        })
        .catch((_) => {
          setError(MESSAGE.ERROR.WRONG);
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
            <FormError message={error && t(`messages_app.${error}`)} />
            <FormSuccess message={success && t(`messages_app.${success}`)} />

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

            {showTwoFactor && (
              <RHFInput name="code" disabled={isPending} placeholder={t('auth.code.placeholder')} />
            )}
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="submit" disabled={isPending} variant="secondary" className="w-full mx-2">
              {t('login')}
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
