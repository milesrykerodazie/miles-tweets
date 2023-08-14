import React, { FC } from "react";
import { IconType } from "react-icons";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconType;
  disabled?: boolean;
  isPlain?: boolean;
}

const ActionButton: FC<ButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  disabled,
  isPlain,
}) => {
  return (
    <button
      className="flex justify-center relative disabled:opacity-70 disabled:cursor-not-allowed font-semibold rounded-lg hover:opacity-80 w-full bg-white trans text-primary py-3"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center">
        {Icon && <Icon size={20} className=" text-white mr-3" />}{" "}
        {isPlain && disabled && (
          <FaSpinner className="text-gray-500 animate-spin mr-3" />
        )}
        {!disabled && <span>{label}</span>}
      </span>
    </button>
  );
};

export default ActionButton;
