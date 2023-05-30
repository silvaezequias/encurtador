import { ChangeEvent } from "react";

interface TextInputProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: TextInputProps) {
  return <input type="text" {...props} />;
}
