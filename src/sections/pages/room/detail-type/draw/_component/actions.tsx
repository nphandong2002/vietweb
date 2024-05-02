'use client';

import { toast } from 'sonner';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

import { ConfirmModal } from 'src/sections/component/modal/confirm-modal';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'src/sections/component/ui/dropdown-menu';
import { Button } from 'src/sections/component/ui/button';
import { deleteRoom } from 'src/database/room/room';
import { MESSAGE } from 'src/shared/constain/message';
import { useLocales } from 'src/locales';
import { useBoolean } from 'src/shared/hooks/client/use-boolean';

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  id: string;
  title: string;
  openModal: () => void;
}

export const Actions = ({ children, side, sideOffset, id, title, openModal }: ActionsProps) => {
  const { t } = useLocales();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success(MESSAGE.SUCCESS.COPY))
      .catch(() => toast.error(MESSAGE.ERROR.COPY));
  };

  const onDelete = () => {
    deleteRoom(id)
      .then(() => toast.success(t(MESSAGE.SUCCESS.ROOM.DELETE, { name: title })))
      .catch(() => toast.error(t(MESSAGE.ERROR.ROOM.DELETE, { name: title })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()} side={side} sideOffset={sideOffset} className="w-60">
        <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          {t('room.copy_link')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openModal()} className="p-3 cursor-pointer">
          <Pencil className="h-4 w-4 mr-2" />
          {t('room.rename')}
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its contents."
          onConfirm={onDelete}
        >
          <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
            <Trash2 className="h-4 w-4 mr-2" />
            {t('room.delete')}
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
