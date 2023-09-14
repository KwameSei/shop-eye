import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, useParams, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import axios from "axios";

import { updateUser, setUser, setUsers, setLoading } from "../../State/auth/authSlice";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validateSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Name is too short").max(50, "Name is too long"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string().required("Password is required").min(6, "Password is too short").max(50, "Password is too long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  phone: Yup.string().required("Phone is required").min(10, "Phone is too short").max(10, "Phone is too long"),
  address: Yup.string().required("Address is required").min(3, "Address is too short").max(50, "Address is too long"),
  avatar: Yup.mixed().required("Avatar is required").test("fileSize", "File too large", (value) => value && value.size <= FILE_SIZE),
})

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [response, setResponse] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  console.log("user:", user);
  console.log("loading:", loading);
  console.log("token:", token);  // parse the json payload and return user id

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
      phone: user?.phone || "",
      address: user?.address || "",
      avatar: null,
    },
  validationSchema: validateSchema,
  enableReinitialize: true,
  onSubmit: (values, actions) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    };
    console.log("Form data:", formData);

    formSubmit(formData);
    actions.resetForm();
  },
});

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serverURL}/api/users/get-profile/${id}`, {
      method: "GET",  
      headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("I get the response here:", response);

      const userData = await response.json();
      console.log("User data:", userData);

      if (userData && userData.avatar && userData.avatar.url) {
        setImagePreview(userData.avatar.url);
      } else {
        setImagePreview(null);
      }

      dispatch(setUser(userData));
      // setValues({
      //   name: userData.user.name,
      //   email: userData.user.email,
      //   password: "",
      //   confirmPassword: "",
      //   phone: userData.user.phone,
      //   address: userData.user.address,
      //   avatar: null,
      // });
      // setImagePreview(userData.user.avatar.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // swal("Error", error.response.message, "error");
      setErrorMessages(error.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${serverURL}/api/users/update-profile/${id}`,
      {
        method: "PUT",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      const data = await response.json();
      console.log("Response data:", data);
      if (data.success) {
        setLoading(false);
        // swal("Success", data.message, "success");
        dispatch(setUsers(data.users));
        navigate(`/profile/${user.id}`);
      } else {
        setLoading(false);
        // swal("Error", data.message, "error");
        setErrorMessages(data.error);
      } 
    } catch (error) {
      console.log(error);
      // swal("Error", error.response.message, "error");
      setErrorMessages(error.response);
    }
  }

  // update the state when the user selects an image
  // const handleImageChange = (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   console.log("File:", file);
  //   setFieldValue("avatar", file);
  //   setImage(file);
  //   setImagePreview(URL.createObjectURL(file));
  // };

  const handleImageChange = (acceptedFiles) => {
    console.log("Accepted Files:", acceptedFiles);
  
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log("Selected File:", file);
  
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="wrapper">
      <Box width="80%" sx={{
        margin: "0 auto",
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Edit Profile
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="name"
            name="name"
            label="Name"
            inputProps={{ shrink: "true" }}
            placeholder="Enter name"
            value={values.name || ""}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helpertext={touched.name && errors.name}
          />

          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="email"
            name="email"
            label="email"
            inputProps={{ shrink: "true" }}
            placeholder="Enter email"
            value={values.email || ""}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helpertext={touched.email && errors.email}
          />

          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="password"
            name="password"
            label="Password"
            inputProps={{ shrink: "true" }}
            placeholder="Enter password"
            value={values.password  || ""}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helpertext={touched.password && errors.password}
          />

          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            inputProps={{ shrink: "true" }}
            placeholder="Enter confirm password"
            value={values.confirmPassword || ""}
            onChange={handleChange}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helpertext={touched.confirmPassword && errors.confirmPassword}
          />

          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            inputProps={{ shrink: "true" }}
            placeholder="Enter phone"
            value={values.phone || ""}
            onChange={handleChange}
            error={touched.phone && Boolean(errors.phone)}
            helpertext={touched.phone && errors.phone}
          />

          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="address"
            name="address"
            label="Address"
            inputProps={{ shrink: "true" }}
            placeholder="Enter address"
            value={values.address || ""}
            onChange={handleChange}
            error={touched.address && Boolean(errors.address)}
            helpertext={touched.address && errors.address}
          />

          <Box 
            border="2px dashed blue" 
            sx={{ p: 2 }}
            className="input-field"
            >
            <Dropzone
              multiple={false}
              maxSize={800000000}
              acceptedFiles={["image/*"]}
              onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Box
                  {...getRootProps()}
                  sx={{
                    "&:hover": {},
                    bg: isDragActive ? "#eee" : "#fff",
                  }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadOutlined sx={{ fontSize: 40 }} />
                      </p>
                      <p style={{ textAlign: "center" }}>Drop the image here ...</p>
                    </>
                  ) : values.avatar === null ? (
                    <>
                      <p style={{ textAlign: "center" }}>
                        <CloudUploadOutlined sx={{ fontSize: 40 }} />
                      </p>
                      <p style={{ textAlign: "center" }}>
                        Drag 'n' drop image here, or click to select image
                      </p>
                    </>
                  ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Box>
                        <img 
                          src={imagePreview || values.avatar} 
                          alt="image" 
                          style={{ 
                            width: "25%", 
                            height: "25%",
                            }} />
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ 
              mt: 2, 
              mb: 2,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;