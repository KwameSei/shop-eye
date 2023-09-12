import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PlusOne, Delete, Edit } from "@mui/icons-material";
import swal from "sweetalert";
import { deleteSupplier, getSupplier } from "../../../State/POS/posSlice";

import "../../pos/display/DisplayPos.scss";
import '../../Common.scss';

const DisplaySupplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const supplier = useSelector((state) => state.pos.supplier);
  const token = useSelector((state) => state.auth.token);

  const fetchSupplier = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/suppliers/get-all-suppliers", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Supplier data", data);

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      if (res.ok) {
        dispatch(getSupplier(data.data));
        console.log("Dispatched supplier data", data);
      }
    } catch (err) {
      console.log(err);
      err.message = "Failed to fetch";
    };
  };

  useEffect(() => {
    fetchSupplier();
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
        dispatch(deleteSupplier(id));
        swal("Poof! Your supplier data has been deleted!", {
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
              <h1 className="m-0 text-dark">Available Suppliers</h1>
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
                      <Link to="/create-branch">
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
                        <th>Supplier Name</th>
                        <th>VAT Number</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplier && supplier.length > 0 ? (
                        supplier.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{data.name}</td>
                              <td>{data.vat}</td>
                              <td>{data.email}</td>
                              <td>{data.phone}</td>
                              <td>{data.address}</td>
                              <td>{data.createdAt}</td>
                              <td>
                                <Link to={`/update-supplier/${data._id}`}>
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

export default DisplaySupplier;
