'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useLocales } from 'src/locales';

export const useEventOnline = () => {
  const { t } = useLocales();
  useEffect(() => {
    const online = () => {
      toast.success(t('user.online', { name: t('user.you') }));
    };
    const offline = () => {
      toast.error(t('user.offline', { name: t('user.you') }));
    };
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);

    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  }, [t]);
};
