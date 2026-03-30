import React from "react";
import { useForm } from "react-hook-form";
import api from "../api";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const nav = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/login", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("accessToken", res.data.accessToken);
      nav("/");
    } catch (error) {
      toast.error(error.response.data || "Error!");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="mb-3">
          <label className="form-label" htmlFor="">
            Email
          </label>
          <input className="form-control" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
