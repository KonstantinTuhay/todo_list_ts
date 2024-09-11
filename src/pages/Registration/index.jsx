import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input, Radio, Button, Modal } from "antd";
import api from "../../api";
import styles from "./index.module.css";

const Registr = () => {
  const [modal, contextHolder] = Modal.useModal();

  const countDown = () => {
    modal.success({
      title: "You have successfully registered!!!",
      content: "Click below to log in",
    });
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (dataUser) => {
    try {
      const response = await api.post("/users/register", dataUser);
      console.log(response);
      console.log("Успешно зарегистрировано");
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
      <h1 className={styles.header}>Registration</h1>
      <div className={styles.labels}>
        <label>First name:</label>
        <Controller
          className={styles.inp}
          name="username"
          control={control}
          rules={{ required: "Поле обязательно для заполнения" }}
          render={({ field }) => <Input {...field} placeholder="Введите имя" />}
        />
        <p>{errors.text?.message}</p>
      </div>

      <div className={styles.labels}>
        <label>Email:</label>
        <Controller
          className={styles.inp}
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
      <div className={styles.labels}>
        <label>Gender:</label>
        <Controller
          className={styles.inp}
          name="gender"
          control={control}
          rules={{ required: "Выберите пол" }}
          render={({ field }) => (
            <Radio.Group {...field}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          )}
        />
        <p>{errors.gender?.message}</p>
      </div>

      <div className={styles.labels}>
        <label>Age:</label>
        <Controller
          className={styles.inp}
          name="age"
          control={control}
          render={({ field }) => (
            <Input type="number" {...field} placeholder="Число" />
          )}
        />
        <p>{errors.number?.message}</p>
      </div>

      <div className={styles.labels}>
        <label>Password:</label>
        <Controller
          className={styles.inp}
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

      <div className={styles.btnslocated}>
        <div className={styles.btns}>
          <Button
            className={styles.btn}
            onClick={countDown}
            type="primary"
            htmlType="submit"
            disabled={!isValid}
          >
            Register
          </Button>
          <Link to="authorization">
            <Button className={styles.btn} type="primary">
              Log In
            </Button>
          </Link>
          {contextHolder}
        </div>
      </div>
    </form>
  );
};

export default Registr;
