import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import api from "../api";

const lessonSchema = z.object({
  title: z.string().min(6),
  content: z.string().optional(),
});

const LessonForm = () => {
  const nav = useNavigate();
  const { courseId, id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      const { data } = await api.get(`/lessons/${id}`);
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
    resolver: zodResolver(lessonSchema),
  });

  const onSubmit = async (data) => {
    if (id) {
      const res = await api.put(`/lessons/${id}`, { ...data, courseId });
    } else {
      const res = await api.post("/lessons", { ...data, courseId });
    }
    nav(`/lessons/${courseId}`);
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
            Content
          </label>
          <textarea
            className="form-control"
            type="text"
            {...register("content")}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
