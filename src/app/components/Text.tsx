import { ChangeEvent } from "react";

interface TextInputProps {
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: TextInputProps) {
  return (
    <input
      className={[
        "bg-gray-900",
        "w-[600px]",
        "max-w-[70vw]",
        "p-2",
        "pl-4",
        "pr-4",
        "outline-none",
        "placeholder:text-gray-700",
        ...[props.error && "border-red-400 text-red-400 border-2"],
      ].join(" ")}
      type="text"
      {...props}
    />
  );
}
