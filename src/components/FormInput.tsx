interface FormInputProps {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  placeholder,
  type = "text",
  value,
  onChange,
}: FormInputProps) {
  return (
    <input
      className="w-full px-4 py-2  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6643b5] focus:border-transparent"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
