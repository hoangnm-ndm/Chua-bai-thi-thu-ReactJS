import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import api from "../api";

const courseAddSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
});

const CourseForm = () => {
  const nav = useNavigate();
  const { courseId, id } = useParams();
  console.log(id);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      const { data } = await api.get(`/courses/${id}`);
      reset(data);
    };
    fetchDetail();
  }, [id]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: zodResolver(courseAddSchema),
  });

  const onSubmit = async (data) => {
    if (id) {
      const res = await api.put(`/courses/${id}`, data);
    } else {
      const res = await api.post("/courses", data);
    }
    nav("/");
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="">
            title
          </label>
          <input className="form-control" type="text" {...register("title")} />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="">
            price
          </label>
          <input
            className="form-control"
            type="text"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="">
            description
          </label>
          <textarea
            className="form-control"
            type="text"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
