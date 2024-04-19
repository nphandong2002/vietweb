export type defaultcomponentType = {
  children: React.ReactNode;
  className?: string;
};

export type defaultRHF = {
  label?: string | React.ReactNode;
  name: string;
  placeholder?: string;
  description?: string | React.ReactNode;
};

export type rhfSelectType = defaultRHF & {
  options: {
    label: string | React.ReactNode;
    value: string;
  }[];
};
export type rhfInputType = defaultRHF & {};
