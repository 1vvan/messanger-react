import React, { PropsWithChildren } from "react";

interface RowContainerProps {
    label: string
}

export const RowContainer: React.FC<PropsWithChildren<RowContainerProps>> = ({label, children}) => {
    return (
      <div className="flex items-center gap-5">
            <h3 className="text-l font-medium text-gray-900 dark:text-gray-300">{label}</h3>
            {children}
      </div>
    );
};