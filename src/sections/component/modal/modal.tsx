'use client';

import { useLocales } from 'src/locales';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from '../ui/dialog';
import { CustomDialogProps } from './type';
import { Button } from '../ui/button';

export const CustomModal = ({
  open,
  onClose,
  title,
  content,
  close = true,
  action,
  description,
  isPending,
}: CustomDialogProps) => {
  const { t } = useLocales();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {content}
        <DialogFooter>
          {close && (
            <DialogClose>
              <Button type="submit" disabled={isPending} variant="error" className="w-full mx-2">
                {t('cancel')}
              </Button>
            </DialogClose>
          )}
          {action}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
