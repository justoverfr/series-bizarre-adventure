interface FormInputProps {
  placeholder: string;
}

export default function FormInput({ placeholder }: FormInputProps) {
  return (
    <input
      className="w-full px-4 py-2  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6643b5] focus:border-transparent text-black"
      placeholder={placeholder}
    />
  );
}
