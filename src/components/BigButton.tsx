interface BigButtonProps {
  text: string;
  onClick?: () => void;
}
export default function BigButton({ text, onClick }: BigButtonProps) {
  return (
    <button
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-transparent bg-[#6643b5]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
