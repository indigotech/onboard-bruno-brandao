interface ButtonProps {
  title: string;
  error?: string;
}

export function Button({ title, error }: ButtonProps) {
  return (
    <div className="flex flex-col mb-3">
      <button
        className="bg-[#0b7b10] text-s text-white p-2 mt-5 w-44 h-12 border-none rounded-xl cursor-pointer transition ease duration-300 font-bold hover:bg-[#4adb64]"
        type="submit"
      >
        {title}
      </button>
      {error && (
        <span className="text-red-500 text-xs regular mb-1 w-52">{error}</span>
      )}
    </div>
  );
}
