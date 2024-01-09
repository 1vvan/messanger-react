import React from "react";
import clsx from "clsx";

type btnModes = "danger" | "primary";

interface ButtonProps {
  mode?: btnModes;
  label: string;
  classNames?: string
}

export const Button: React.FC<ButtonProps> = ({
  mode = "primary",
  label,
  classNames,
}) => {
  return (
    <button
      className={clsx(
        "font-medium text-l rounded-full px-12px py-8px border-2",
        {
          "bg-red-600	text-red-950 border-red-700 hover:shadow-md hover:shadow-red-900":
            mode === "danger",
          "text-gray-900 dark:text-gray-300 bg-gray-300 dark:bg-primary-dark border-gray-500 dark:border-secondary-dark hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-gray-700":
            mode === "primary",
        }, classNames
      )}
    >
      {label}
    </button>
  );
};
