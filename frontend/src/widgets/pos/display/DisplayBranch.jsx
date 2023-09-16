import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PlusOne, Delete, Edit } from "@mui/icons-material";
import swal from "sweetalert";
import { deleteBranch, getBranch } from "../../../State/POS/posSlice";
import DisplayTable from "../../../components/tables/DisplayTable";

import "./DisplayPos.scss";
import '../../Common.scss';

const DisplayBranch = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const branches = useSelector((state) => state.pos.branch);
  const [branches, setBranches] = useState([]);
  console.log("Branches data", branches);
  const token = useSelector((state) => state.auth.token);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  const fetchBranch = async () => {
    try {
      const res = await fetch(`${serverURL}/api/branches/get-branches`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("API Response Data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      if (res.ok) {
        const branchData = data.branches.map((branch) => {
          return {
            _id: branch._id,
            name: branch.name,
            phone: branch.phone,
            address: branch.address,
            pos_machine: branch.pos_machine,
            image: branch.image,
            createdAt: new Date(branch.createdAt).toLocaleString(),
          };
        });
        setBranches(branchData);

        console.log("Branch Data", branchData);
        // dispatch(getBranch(data.branches));
        // console.log("Dispatched Branch data", data.branch);
      }
    } catch (err) {
      console.log(err);
      err.message = "Failed to fetch";
    };
  };

  useEffect(() => {
    fetchBranch();
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
        dispatch(deleteBranch(id));
        swal("Poof! Your POS Branch data has been deleted!", {
          icon: "success",
        });
      }
    });
  }

  const columns = [
    {
      Header: "Store Front",
      accessor: "image",
      Cell: (props) => {
        return (
          props.value && props.value.url ? (
            <img
              src={props.value.url}
              alt="Branch Image"
              style={{ width: "50px", height: "50px" }}
            />
          ) : (
            <p>No image available</p>
          )
        );
      }
    },
    {
      Header: "Branch Name",
      accessor: "name",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "POS",
      accessor: "pos_machine",
      Cell: (props) => {
        props.value && Array.isArray(props.value) ? (
          <div>
            {props.value.map((value) => {
              return (
                <div key={value._id}>
                  <p>{value.alias + ","}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No data available</p> // Display a message when props.value is null or not an array
        )
      },
    },
    {
      Header: "Created At",
      accessor: "createdAt",
    },
    {
      Header: "Action",
      accessor: "_id",
      Cell: (props) => {
        return (
          <div>
            <Link to={`/update-branch/${props.value}`}>
              <Edit />
            </Link>
            {" | "}
            <Link onClick={() => confirmDelete(props.value)}>
              <Delete />
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="display-branch main">
      {branches ? (
  <DisplayTable columns={columns} data={branches} deleteFunction={confirmDelete} />
) : (
  <p>Loading data...</p>
)}
    </div>
  );

  // return (
  //   <div className="content-wrapper main">
  //     <div className="content-header">
  //       <div className="container-fluid">
  //         <div className="row mb-2">
  //           <div className="col-sm-6">
  //             <h1 className="m-0 text-dark">Available POS Branches</h1>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <section className="content">
  //       <div className="container-fluid">
  //         <div className="row">
  //           <div className="col-12">
  //             <div className="card">
  //               <div className="card-header">
  //                 <h3 className="card-title"></h3>
  //                 <div className="card-tools">
  //                   <div className="input-group input-group-sm">
  //                     <Link to="/create-branch">
  //                       <button type="submit" className="btn btn-default">
  //                         <PlusOne />
  //                       </button>
  //                     </Link>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="card-body table-responsive p-0">
  //                 <table className="table table-hover text-nowrap custom-table">
  //                   <thead>
  //                     <tr>
  //                       <th>Store Front</th>
  //                       <th>Branch Name</th>
  //                       <th>Phone</th>
  //                       <th>Address</th>
  //                       <th>POS</th>
  //                       <th>Created At</th>
  //                       <th>Action</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {branch && branch.length > 0 ? (
  //                       branch.map((data, index) => {
  //                         return (
  //                           <tr key={index}>
  //                             <td>
  //                             {data.image && (
  //                                 <img
  //                                   src={data.image.url}
  //                                   alt={`Branch ${index} Image`}
  //                                   style={{ width: "50px", height: "50px" }}
  //                                 />
  //                               )}
  //                             </td>
  //                             <td>{data.name}</td>
  //                             <td>{data.phone}</td>
  //                             <td>{data.address}</td>
  //                             <td>
  //                               {data.pos_machine.map(value => {
  //                                 return (
  //                                   <div key={value._id}>
  //                                     <p>{value.alias + ","}</p>
  //                                   </div>
  //                                 )
  //                               })}
  //                             </td>
  //                             <td>{data.createdAt}</td>
  //                             <td>
  //                               <Link to={`/update-branch/${data._id}`}>
  //                                 <Edit />
  //                               </Link>
  //                               {" | "}
  //                               <Link onClick={() => confirmDelete(data._id)}>
  //                                 <Delete />
  //                               </Link>
  //                             </td>
  //                           </tr>
  //                         );
  //                       })
  //                     ) : (
  //                       <tr>
  //                         <td colSpan="4">No data available</td>
  //                       </tr>
  //                     )}
  //                   </tbody>
  //                 </table>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );
};

export default DisplayBranch;
