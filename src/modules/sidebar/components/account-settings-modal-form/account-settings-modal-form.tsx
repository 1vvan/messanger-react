import React from "react";
import { RowContainer } from "@/shared/components/row-container/row-container";
import styles from "./account-settings-modal-form.module.scss";
import clsx from "clsx";
import { IAccountSettings } from "@/shared/types/user-api-types";
import ImageUploadField from "@/shared/components/image-upload-field/image-upload-field";

interface AccountSettingsModalFormProps {
  settingsFormData: IAccountSettings;
  formDataErorrs: IAccountSettings;
  handleChangeFormData: (key, value) => void;
  handleFileChange: (e) => void;
  handleConfirmUpdateAccount: (e) => void;
}

export const AccountSettingsModalForm: React.FC<AccountSettingsModalFormProps> = ({
  settingsFormData,
  formDataErorrs,
  handleChangeFormData,
  handleFileChange,
  handleConfirmUpdateAccount,
}) => {
  return (
    <form
      className={styles["accout-settings-form"]}
      noValidate
      onSubmit={(e) => handleConfirmUpdateAccount(e)}
    >
      <ImageUploadField
        handleFileChange={handleFileChange}
        profilePictureUrl={settingsFormData.profilePicture}
      />
      <RowContainer label="Name:">
        <div className={styles["accout-settings-form-field"]}>
          <input
            className={clsx(styles["accout-settings-form-field-input"], {
              [styles["accout-settings-form-field-input--error"]]:
                !!formDataErorrs.name,
            })}
            type="text"
            value={settingsFormData.name}
            onChange={(e) => handleChangeFormData("name", e.target.value)}
          />
          <span>{formDataErorrs.name}</span>
        </div>
      </RowContainer>
      <RowContainer label="Nickname:">
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
      <RowContainer label="Email:">
        <div className={styles["accout-settings-form-field"]}>
          <input
            className={clsx(styles["accout-settings-form-field-input"], {
              [styles["accout-settings-form-field-input--error"]]:
                !!formDataErorrs.email,
            })}
            type="email"
            value={settingsFormData.email}
            onChange={(e) => handleChangeFormData("email", e.target.value)}
          />
          <span>{formDataErorrs.email}</span>
        </div>
      </RowContainer>
      <RowContainer label="Language:">
        <div className={styles["accout-settings-form-field"]}>
          <input
            className={clsx(styles["accout-settings-form-field-input"], {
              [styles["accout-settings-form-field-input--error"]]:
                !!formDataErorrs.lang,
            })}
            type="text"
            value={settingsFormData.lang}
            onChange={(e) => handleChangeFormData("lang", e.target.value)}
          />
          <span>{formDataErorrs.lang}</span>
        </div>
      </RowContainer>
      {/* <RowContainer label="Profile Picture:">
        <div className={styles["accout-settings-form-field"]}>
          <input
            className={clsx(styles["accout-settings-form-field-input"], {
              [styles["accout-settings-form-field-input--error"]]:
                !!formDataErorrs.profilePicture,
            })}
            type="file"
            onChange={handleFileChange}
          />
          <span>{formDataErorrs.profilePicture}</span>
        </div>
      </RowContainer> */}
    </form>
  );
};
