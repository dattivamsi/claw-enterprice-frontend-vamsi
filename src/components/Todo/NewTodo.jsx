
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Select } from "antd";
import FormInput from "../FormInput";

const { Option } = Select;

const NewTodo = ({ onSubmit, handleCancel, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      todo: "",
      completed: "InProgress",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        todo: defaultValues.todo || "",
        completed: defaultValues.completed || "InProgress",
      });
    }
  }, [defaultValues, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormInput
          name="todo"
          label="Description"
          control={control}
          errors={errors}
          rules={{ required: { value: true, message: "Description is required" } }}
        />
        <div className="card-input-container">
          <label htmlFor="completed" className="card-title">
            <sup className="required super">* </sup>
            Status
          </label>
          <Controller
            name="completed"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select
                {...field}
                id="completed"
                className="card-input"
                placeholder="Select status"
              >
                <Option value="InProgress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            )}
          />
          {errors.completed && (
            <p className="required">{errors.completed.message}</p>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: "2rem" }}>
            Cancel
          </Button>
          <Button key="submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTodo;
