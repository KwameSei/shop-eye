import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PlusOne, Delete, Edit } from "@mui/icons-material";
import swal from "sweetalert";
import { deletePos, getPos } from "../../../State/POS/posSlice";

import "./DisplayPos.scss";
import '../../Common.scss';

const DisplayPos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pos = useSelector((state) => state.pos.pos);
  // const [pos, setPos] = useState([]); 
  const token = useSelector((state) => state.auth.token);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // useEffect(() => {
  //   if (localStorage.getItem('token') === null) {
  //     navigate('/login');
  //   }
  //   dispatch(getPos());
  // }, []);

  const fetchPos = async () => {
    try {
      const res = await fetch(`${serverURL}/api/pos/get-pos`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      if (res.ok) {
        dispatch(getPos(data.pos));
      }
    } catch (err) {};
  };

  useEffect(() => {
    fetchPos();
  }, []);

  function confirmDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePos(id));
        swal("Poof! Your POS Machine data has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  return (
    <div className="content-wrapper main">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Available POS Machines</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"></h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm">
                      <Link to="/create-pos">
                        <button type="submit" className="btn btn-default">
                          <PlusOne />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap custom-table">
                    <thead>
                      <tr>
                        <th>Alias</th>
                        <th>Serial Number</th>
                        <th>Created Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pos && pos.length > 0 ? (
                        pos.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{data.alias}</td>
                              <td>{data.serial_number}</td>
                              <td>{data.createdAt}</td>
                              <td>
                                <Link to={`/update-pos/${data._id}`}>
                                  <Edit />
                                </Link>
                                {" | "}
                                <Link onClick={() => confirmDelete(data._id)}>
                                  <Delete />
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisplayPos;
