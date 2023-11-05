import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

type ListItem = {
  name: string;
  place: String;
  state: String;
  district: string;
  discriptiion: string;
  image: string;
  _id: String;
};

function Dashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(1);
  const[pages,setpages]=useState(1)
  const baseUrl = "http://localhost:5000/api/school/";

  const [list, setList] = useState<ListItem[]>([]);
  const navigate = useNavigate();
  const getdetais = async () => {
    try {
      const responce = await axios.get(baseUrl, {
        params: {
          page: page,
          search: search,
          sort: sort,
        },
      });

    
      if (responce.data.success) {
        setList(responce.data.lists);
        setpages(responce.data.pages)
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const deleting = async (id: String) => {
    try {
      const responce = await axios.put(
        `http://localhost:5000/api/school/delete/${id}`,
        id
      );
      if (responce.data.success) {
        toast.success(responce.data.message);
        getdetais();
      } else {
        toast.error(responce.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const handleEditclick = (id: String) => {
    navigate("/add", { state: id });
  };
  const getView = (id: String) => {
    navigate("/view", { state: id });
  };

  useEffect(() => {
    getdetais();
  }, []);
  useEffect(() => {
    getdetais();
  }, [page, search, sort]);
  return (
    <div>
      <div>
        <div className="bg-light p-3 text-center">
          <h1 className="text-center display-4 font-weight-bold text-primary mb-5">
            School Lists
          </h1>

          <nav className="navbar navbar-light bg-light">
            <div className="form-inline">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="btn-group ml-2">
                <button
                  className="btn btn-success dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sort by Name
                </button>
                <div className="dropdown-menu">
                  <button
                    onClick={() => setSort(1)}
                    className="dropdown-item"
                    type="button"
                  >
                    Ascending
                  </button>
                  <button
                    onClick={() => setSort(-1)}
                    className="dropdown-item"
                    type="button"
                  >
                    Descendig
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/add")}
              type="button"
              className="btn btn-success"
            >
              Add School{" "}
            </button>
          </nav>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                No
              </th>
              <th className="text-center" scope="col">
                Name of school
              </th>
              <th className="text-center" scope="col">
                Place
              </th>
              <th className="text-center" scope="col">
                State
              </th>
              <th className="text-center" scope="col">
                District
              </th>

              <th className="text-center" scope="col">
                Icon
              </th>
              <th className="text-center" scope="col">
                Delete
              </th>
              <th className="text-center" scope="col">
                Edit
              </th>
              <th className="text-center" scope="col">
                View
              </th>
            </tr>
          </thead>

          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <th className="text-center pt-4" scope="row">
                  {index + 1}
                </th>
                <td className="text-center pt-4">{item.name}</td>
                <td className="text-center pt-4">{item.place}</td>
                <td className="text-center pt-4">{item.state}</td>
                <td className="text-center pt-4">{item.district}</td>
                <td
                  className="text-center pt-4"
                  style={{ width: "100px", height: "100px" }}
                >
                  <img
                    src={`http://localhost:5000/icons/${item.image}`}
                    alt="Image"
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "cover",
                      borderRadius: "50px",
                    }}
                  />
                </td>
                <td className="text-center">
                  <button
                    onClick={() => deleting(item._id)}
                    type="button"
                    className="btn btn-danger mt-4"
                  >
                    Delete
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      handleEditclick(item._id);
                    }}
                    type="button"
                    className="btn btn-info mt-4"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      getView(item._id);
                    }}
                    className="btn btn-primary mt-4"
                    type="button"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">

            <ul className="pagination pagination-lg text-center">
  {Array.from({ length: pages }, (_, i) => (
   
    <li className="page-item">
    <a
      className="page-link bg-success text-light"
      onClick={() => setPage(i+1)}
    >
     { i+1}
    </a>
  </li>
  ))}
</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
