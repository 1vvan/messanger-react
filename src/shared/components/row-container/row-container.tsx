import React, { PropsWithChildren } from "react";
import styles from './row-container.module.scss'

interface RowContainerProps {
    label: string
}

export const RowContainer: React.FC<PropsWithChildren<RowContainerProps>> = ({label, children}) => {
    return (
      <div className={styles['row-container']}>
            <h3>{label}</h3>
            {children}
      </div>
    );
};