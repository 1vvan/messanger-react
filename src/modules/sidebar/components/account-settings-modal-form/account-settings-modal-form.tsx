import React from "react";
import { RowContainer } from "@/shared/components/row-container/row-container";
import styles from "./account-settings-modal-form.module.scss";
import clsx from "clsx";
import { IAccountSettings } from "@/shared/types/user-api-types";

interface AccountSettingsModalFormProps {
  settingsFormData: IAccountSettings;
  formDataErorrs: IAccountSettings;
  handleChangeFormData: (key, value) => void;
  handleConfirmUpdateAccount: (e) => void;
}

export const AccountSettingsModalForm: React.FC<AccountSettingsModalFormProps> = ({
  settingsFormData,
  formDataErorrs,
  handleChangeFormData,
  handleConfirmUpdateAccount,
}) => {
  return (
    <form
      className={styles["accout-settings-form"]}
      noValidate
      onSubmit={(e) => handleConfirmUpdateAccount(e)}
    >
      <RowContainer label="Name:">
        <div className={styles["accout-settings-form-field"]}>
          <input
            className={clsx(styles["accout-settings-form-field-input"], {
              [styles["accout-settings-form-field-input--error"]]:
                !!formDataErorrs.nickname,
            })}
            type="text"
            value={settingsFormData.nickname}
            onChange={(e) => handleChangeFormData("nickname", e.target.value)}
          />
          <span>{formDataErorrs.nickname}</span>
        </div>
      </RowContainer>
    </form>
  );
};
