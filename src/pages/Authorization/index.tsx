import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import api from "../../api";
import styles from "./index.module.css";

const Authorization = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (dataUser) => {
    try {
      const response = await api.post("/auth/login", dataUser);
      console.log(response);

      localStorage.setItem("token", response.data.token);
      navigate("/todo");

      reset();
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.registration_form}
    >
      <div>
        <h1>Authorization</h1>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Поле обязательно для заполнения",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "Введите корректный email",
            },
          }}
          render={({ field }) => <Input {...field} placeholder="Email" />}
        />
        <p>{errors.email?.message}</p>
      </div>

      <div>
        <label>Password:</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 6,
              message:
                "Пароль должен быть не меньше 6 символов и содержать хотя бы одну заглавную букву",
            },
            validate: (letter) => {
              return (
                letter
                  .split("")
                  .filter((item) => !isFinite(item))
                  .map((item) => item === item.toUpperCase())
                  .includes(true) ||
                "Пароль должен содержать хотя бы одну заглавную букву"
              );
            },
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Введите пароль" />
          )}
        />
        <p>{errors.password?.message}</p>
      </div>

      <Button type="primary" htmlType="submit">
        Sign In
      </Button>
    </form>
  );
};

export default Authorization;
