import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Course = () => {
  const [courses, setCourses] = useState([]);

  const fetchAPI = async () => {
    const { data } = await api.get("/courses");
    console.log(data);
    setCourses(data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleRemove = async (id) => {
    try {
      const { data } = await api.delete(`/courses/${id}`);
      fetchAPI();
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };
  return (
    <div>
      <h1>Danh sach khoa hoc</h1>
      <Link className="btn btn-primary" to={"/add"}>
        Add new
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={`/lessons/${item.id}`}>{item.title}</Link>
              </td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <Link className="btn btn-warning" to={`/update/${item.id}`}>
                  Sua
                </Link>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Xoa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
