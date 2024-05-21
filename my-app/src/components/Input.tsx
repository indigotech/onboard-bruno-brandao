import { ChangeEvent } from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function Input({ label, value, onChange, error }: FormInputProps) {
  return (
    <div className="flex flex-col mb-3">
      <label
        className={`text1-1 text-left w-52 font-regular mb-3 ${error ? "text-red-500" : "text-slate-700"}`}
      >
        {label}
      </label>
      <input
        type="text"
        className={`border rounded px-1 h-9 h-10 w-52 mb-3 ${error ? "border-red-500" : "border-slate-300"}`}
        value={value}
        onChange={onChange}
      />
      {error && (
        <span className="text-red-500 text-xs w-52 regular mb-1">{error}</span>
      )}
    </div>
  );
}
