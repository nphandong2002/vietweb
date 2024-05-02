export type ConfirmDialogProps = {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  onClose: VoidFunction;
};

export type CustomDialogProps = {
  title: React.ReactNode;
  content?: React.ReactNode;
  action?: React.ReactNode;
  onClose: VoidFunction;
  close?: boolean;
  styleFooter?: React.CSSProperties;
  open: boolean;
  description?: React.ReactNode;
  isPending?: boolean;
};
