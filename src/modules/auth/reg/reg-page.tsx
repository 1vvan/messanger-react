import React from "react";
import styles from "../login-page.module.scss";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes/routes";
import { useReg } from "./use-reg";
import { ToastContainer } from "react-toastify";

export const RegPage = () => {
  const { models, commands } = useReg();
  return (
    <section className={styles["auth"]}>
      <ToastContainer
        limit={2}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        autoComplete="off"
        onSubmit={commands.handleSubmitReg}
        className={styles["auth__form"]}
        noValidate
      >
        {models.isLoading && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "24px",
              right: "30px",
            }}
            size={24}
          />
        )}
        <h2>Registration</h2>
        <TextField
          autoComplete="off"
          label="Email"
          onChange={(e) =>
            commands.handleChangeRegData("email", e.target.value)
          }
          required
          variant="outlined"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={models.registerData["email"]}
          error={!!models.regErrors.email}
          helperText={models.regErrors.email}
        />
        <FormControl
          sx={{ mb: 3 }}
          variant="outlined"
          fullWidth
          error={!!models.regErrors.password}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="outlined-adornment-password"
            type={models.showPassword ? "text" : "password"}
            value={models.registerData["password"]}
            onChange={(e) =>
              commands.handleChangeRegData("password", e.target.value)
            }
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={commands.handleClickShowPassword}
                  onMouseDown={commands.handleMouseDownPassword}
                  edge="end"
                >
                  {models.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>{models.regErrors.password}</FormHelperText>
        </FormControl>
        <TextField
          autoComplete="off"
          label="Name"
          onChange={(e) => commands.handleChangeRegData("name", e.target.value)}
          required
          variant="outlined"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={models.registerData["name"]}
          error={!!models.regErrors.name}
          helperText={models.regErrors.name}
        />
        <TextField
          autoComplete="off"
          label="Nickname"
          onChange={(e) =>
            commands.handleChangeRegData("nickname", e.target.value)
          }
          required
          variant="outlined"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={models.registerData["nickname"]}
          error={!!models.regErrors.nickname}
          helperText={models.regErrors.nickname}
        />
        <TextField
          autoComplete="off"
          label="Lang"
          onChange={(e) => commands.handleChangeRegData("lang", e.target.value)}
          required
          variant="outlined"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={models.registerData["lang"]}
          error={!!models.regErrors.lang}
          helperText={models.regErrors.lang}
        />
        <Button variant="contained" type="submit" fullWidth>
          Register
        </Button>
        <p className={styles["auth__form_link"]}>
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN.path}>Login Here</Link>
        </p>
      </form>
    </section>
  );
};
