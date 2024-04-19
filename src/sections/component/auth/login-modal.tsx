import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '../ui/dialog';
import { useLocales } from 'src/locales';
import FormProvider from 'src/shared/context/form/form-provider';
import { useForm } from 'react-hook-form';
import RHFInput from '../hook-form/rhf-input';

function LoginModal() {
  const { t } = useLocales();
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {});
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t('login')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t('login')}</DialogTitle>
        </DialogHeader>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="flex items-center space-x-2">
            <RHFInput name="username" />
          </div>
        </FormProvider>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
