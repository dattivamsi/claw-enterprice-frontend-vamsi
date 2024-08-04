import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import { login, registeration } from "../api";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await registeration(
        data.username,
        data.email,
        data.password
      );
      console.log(response,"registrationData");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
      <h1 style={{textAlign:"center"}}>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            label="Email"
            control={control}
            errors={errors}
            type="email"
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
          />
          <FormInput
            name="username"
            label="User Name"
            control={control}
            errors={errors}
            rules={{
              required: { value: true, message: "User Name is required" },
              minLength: {
                value: 5,
                message: "User Name must be at least 5 characters long",
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
                  "Password must be at least 8 characters long and include one letter, one number, and one special character",
              },
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
