import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => any;
}

export default function Button(props: ButtonProps) {
  return <button {...props}></button>;
}
