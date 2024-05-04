export type defaultcomponentType = {
  children: React.ReactNode;
  className?: string;
};

export type defaultRHF = {
  label?: string | React.ReactNode;
  name: string;
  placeholder?: string;
  description?: string | React.ReactNode;
  className?: string;
};

export type rhfSelectType = defaultRHF & {
  options: {
    label: string | React.ReactNode | JSX.Element;
    value: any;
  }[];
};
export type rhfGroupRadioType = defaultRHF & {
  options: {
    label: string | React.ReactNode | JSX.Element;
    value: any;
  }[];
  labelInChild?: boolean;
};
export interface rhfInputType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  description?: string | React.ReactNode;
  name: string;
}
