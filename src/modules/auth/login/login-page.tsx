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
import { useLogin } from "./use-login";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes/routes";

export const LoginPage = () => {
  const { models, commands } = useLogin();
  return (
    <section className={styles["auth"]}>
      <form
        autoComplete="off"
        onSubmit={commands.handleSubmitLogin}
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
        <h2>Login</h2>
        <TextField
          autoComplete="off"
          label="Email"
          onChange={(e) =>
            commands.handleChangeLoginData("email", e.target.value)
          }
          required
          variant="outlined"
          type="email"
          sx={{ mb: 3 }}
          fullWidth
          value={models.loginData["email"]}
          error={!!models.loginErrors.email}
          helperText={models.loginErrors.email}
        />
        <FormControl
          sx={{ mb: 3 }}
          variant="outlined"
          fullWidth
          error={!!models.loginErrors.password}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="outlined-adornment-password"
            type={models.showPassword ? "text" : "password"}
            value={models.loginData["password"]}
            onChange={(e) =>
              commands.handleChangeLoginData("password", e.target.value)
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
          <FormHelperText>{models.loginErrors.password}</FormHelperText>
        </FormControl>
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
        <p className={styles["auth__form_link"]}>
          Need an account?{" "}
          <Link to={ROUTES.REGISTRATION.path}>Register Here</Link>
        </p>
      </form>
    </section>
  );
};
