import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

const Lesson = () => {
  const { courseId } = useParams();
  console.log(courseId);
  const [lessons, setLessons] = useState([]);

  const fetchAPI = async () => {
    const { data } = await api.get(`/lessons?courseId=${courseId}`);
    console.log(data);
    setLessons(data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleRemove = async (id) => {
    try {
      const { data } = await api.delete(`/lessons/${id}`);
      fetchAPI();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Danh sach bai hoc</h1>
      <Link className="btn btn-primary" to={`/lessons/${courseId}/add`}>
        Add new
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {lessons.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <Link
                  className="btn btn-warning"
                  to={`/lessons/${courseId}/update/${item.id}`}
                >
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

export default Lesson;
