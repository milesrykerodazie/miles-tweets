import React from "react";

interface FormProps {
  count: number;
  title: string;
  state: string;
  maxCount: number;
  showCount: boolean;
  setShowCount: React.Dispatch<React.SetStateAction<boolean>>;
  setState: (value: string) => void;
  placeHolder?: string;
}

const FormField = ({
  count,
  title,
  state,
  maxCount,
  showCount,
  setShowCount,
  setState,
  placeHolder,
}: FormProps) => {
  return (
    <div
      className={`flex flex-col  p-2 rounded-md ${
        showCount ? "border-2 border-blue-600" : "border border-primarygrey/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <label className="text-primaryLabel">{title}</label>
        {showCount && (
          <span className="text-primaryLabel text-sm">
            {count}/{maxCount}
          </span>
        )}
      </div>

      <input
        type="text"
        minLength={4}
        maxLength={maxCount}
        placeholder={placeHolder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="py-2 outline-none text-white bg-transparent"
        onFocus={(e) => {
          e.preventDefault();
          setShowCount((current) => !current);
        }}
      />
    </div>
  );
};

export default FormField;
