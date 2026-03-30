import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [sortVallue, setSortVallue] = useState("");

  const fetchAPI = async () => {
    if (!sortVallue) {
      const { data } = await api.get(`/courses?q=${search}`);
      setCourses(data);
    } else {
      const { data } = await api.get(
        `/courses?q=${search}&_sort=price&_order=${sortVallue}`
      );
      setCourses(data);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [search, sortVallue]);

  const handleRemove = async (id) => {
    try {
      const { data } = await api.delete(`/courses/${id}`);
      fetchAPI();
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    console.log(e.target.value);
    setSortVallue(e.target.value);
  };

  return (
    <div>
      <form action="">
        <input
          className="form-control"
          type="text"
          placeholder="search course..."
          onChange={(e) => handleSearch(e)}
          value={search}
        />
      </form>
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
            <th>
              <select
                name="price"
                className="form-control"
                onChange={(e) => handleSort(e)}
              >
                <option value="">Sắp xếp</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
                <option value="">Huỷ</option>
              </select>
            </th>
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
