import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => any;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className="bg-gray-900 group p-2 h-10 w-10 flex justify-center items-center disabled:cursor-not-allowed"
      {...props}
    ></button>
  );
}
