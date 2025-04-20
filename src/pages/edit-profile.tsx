import { Avatar, Button } from "@mui/material";
import UserProfile from "../components/userProfile/profile";
import avat from "../assets/user/man-studio.png";
import { useSportlaze } from "../hooks/useContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditSchema } from "../utils/validator";
import baseUrl from "../utils/baseUrl";
import camera from "../assets/svgs/Camera.png";
import { useRef, useState } from "react";
import { formprps } from "./signUp";
import DOB from "../components/auth/DOB";

const EditProfile = () => {
  const { login, setLoading, setSnackIsOpen, user, setUser } = useSportlaze();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const url = baseUrl();
  const [file, setFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBannarUrl, setPreviewBnnarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bannerFileInputRef = useRef<HTMLInputElement | null>(null);
  const [userData, setUserData] = useState<formprps>({
    name: "",
    email: "",
    dateOfBirth: "",
    country: { label: "", value: "" },
    favSport: { label: "", value: "" },
    FavSportTeam: { label: "", value: "" },
  });

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleBannerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    bannerFileInputRef.current?.click();
  };

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setBannerFile(selected);
      setPreviewBnnarUrl(URL.createObjectURL(selected));
      setMessage(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setMessage(null);
    }
  };

  const handleUploadBanner = async () => {
    if (!bannerFile) {
      setMessage("Please select a file first.");
      return;
    }
    console.log("uplaod");

    const formData = new FormData();
    formData.append("file", bannerFile);

    try {
      setUploading(true);
      const response = await axios.post(
        `${url}/profile/upload-banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Replace with actual token
          },
        }
      );

      if (response.status === 200) {
        setMessage("Upload successful!");
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      setMessage("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
    console.log("uplaod");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axios.post(
        `${url}/profile/upload-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Replace with actual token
          },
        }
      );

      if (response.status === 200) {
        setMessage("Upload successful!");
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      setMessage("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <UserProfile>
      <div
        className="flex items-center justify-center bg-gradient-to-b from-[#463a85] to-[#9a1b39] p-[-16px] w-full h-[10rem] relative cursor-pointer"
        onClick={handleBannerClick}
      >
        {previewBannarUrl ? (
          <img
            src={previewBannarUrl}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <img src={camera} alt="cameraicon" />
          // <FiCamer size={32} color="#888" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleBannerFileChange}
          ref={bannerFileInputRef}
          style={{ display: "none" }}
        />
        <div
          className="flex justify-center overflow-hidden items-center absolute right-[2rem] bottom-[-2rem] h-[6rem] w-[6rem] border rounded-[100%] cursor-pointer"
          onClick={handleAvatarClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img src={camera} alt="cameraicon" />
            // <FiCamer size={32} color="#888" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <Formik
        initialValues={{
          name: "",
          username: "",
          bio: "",
          date_of_birth: "",
          website: "",
          location: "",
        }}
        validationSchema={EditSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          if (file) {
            console.log(file);
            handleUpload().then(() => {
              navigate(`/user/${user.username}`);
            });
          } else if (bannerFile) {
            console.log(bannerFile);
            handleUploadBanner().then(() => {
              navigate(`/user/${user.username}`);
            });
          }

          let data = { ...values };
          if (!userData.dateOfBirth.includes("NaN")) {
            data = { ...values, date_of_birth: userData.dateOfBirth };
          }

          const cleaned = Object.fromEntries(
            Object.entries(data).filter(([_, val]) => val !== "")
          );
          console.log(cleaned, "cleaned");

          try {
            const { data } = await axios.put(
              `${url}/auth/${user?.username}`,
              {
                ...cleaned,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (data) {
              // setUser({
              //   bio: data.user.bio
              // })
              navigate(`/user/${user.username}`);
            }
          } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
              // setSnackIsOpen(true);
              // setMessage({
              //   message: error.response?.data?.detail || "An error occurred",
              //   message: "An error occurred",
              //   error: true,
              // });
            }
          } finally {
            setLoading(false);
            setTimeout(() => setSnackIsOpen(false), 5000);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-2 mt-10 p-2 px-4">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Username", name: "username", type: "text" },
              { label: "Bio", name: "bio", type: "text" },
              // { label: "Date of Birth", name: "date_of_birth", type: "text" },
              { label: "Website", name: "website", type: "text" },
              { label: "Location", name: "location", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <div className="flex justify-between gap-4">
                  <label htmlFor={name} className="font-bold dark:text-darkw">
                    {label}
                  </label>
                  <ErrorMessage name={name}>
                    {(msg) =>
                      typeof msg === "string" ? (
                        <div className="text-[red] text-[12px] mb-[-.5rem]">
                          {msg}
                        </div>
                      ) : null
                    }
                  </ErrorMessage>
                </div>
                <Field
                  className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none border-b 
                    // errors[name] && touched[name] ? "border-[rgb(190, 63, 13)]" : "border-[white]"
                  dark:text-darkw`}
                  id={name}
                  name={name}
                  type={type}
                />
              </div>
            ))}
            <div>
              <div className="flex justify-between gap-4">
                <label
                  htmlFor={"dob"}
                  className="font-bold mb-2 dark:text-darkw"
                >
                  Date of Birth
                </label>
              </div>
              <DOB userData={userData} setUserData={setUserData} />
            </div>
            <Button
              sx={{
                color: "white",
                background: "#9a1b39",
                borderRadius: "2rem",
                textTransform: "capitalize",
                padding: "10px",
                margin: "0 5rem 0 5rem",
                marginTop: "2rem",
              }}
              type="submit"
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </UserProfile>
  );
};

export default EditProfile;
