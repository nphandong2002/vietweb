export type defaultcomponentType = {
  children: React.ReactNode;
  className?: string;
};

export type selectType = {
  placeholder?: string;
  options: {
    label: string | React.ReactNode;
    value: string;
  }[];
  description?: string | React.ReactNode;
  label?: string | React.ReactNode;
  name: string;
};
