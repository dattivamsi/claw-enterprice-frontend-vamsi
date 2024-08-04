import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import { login } from "../api";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data.username, data.password);
      localStorage.setItem('token', response.token);
      navigate("/todos"); 
    } catch (err) {
      
      alert(err?.response?.data?.message)
    }
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h1 style={{textAlign:"center"}}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="username"
            label="USER NAME"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: "User Name is required" },
              minLength: {
                value: 5,
                message: "User Name Minimum 5 characters",
              },
            }}
          />
          <FormInput
            name="password"
            label="Password"
            control={control}
            errors={errors}
            type="password"
            rules={{
              required: { value: true, message: "Password is required" },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Password must contain at least 8 characters, including one letter, one number, and one special character",
              },
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <p className="registration">
          You Don't Have an Account? <span onClick={goToRegistration}>Register</span> Here
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
