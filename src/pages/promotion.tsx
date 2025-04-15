import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/layout/layout";
import gradimg from "../assets/logo gradient.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useSportlaze } from "../hooks/useContext";
import copyicon from "../assets/promotion/lucide_copy-plus.svg";
import createAds from "../assets/promotion/ic_round-add.svg";
import deleteIcon from "../assets/promotion/material-symbols_delete-outline-rounded.svg";
import uploadicon from "../assets/promotion/material-symbols_upload.svg";
import promotionIcon from "../assets/promotion/promotion-icon.svg";

export const PromotionPage = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { user } = useSportlaze();

  const formik = useFormik({
    initialValues: {
      postText: "",
      media: [] as File[],
      headline: "",
      url: "",
      mediaType: "carousel" as "single" | "carousel",
    },
    validationSchema: Yup.object({
      postText: Yup.string().required("Required"),
      media: Yup.array()
        .min(1, "At least one media file is required")
        .required("Required"),
      headline: Yup.string().required("Required"),
      url: Yup.string().url("Invalid URL").required("Required"),
      mediaType: Yup.string().oneOf(["single", "carousel"]).required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("postText", values.postText);
      values.media.forEach((file) => formData.append("media", file));
      formData.append("headline", values.headline);
      formData.append("url", values.url);
      formData.append("mediaType", values.mediaType);

      try {
        const response = await fetch("/api/posts", {
          method: "POST",

          body: formData,
        });
        if (!response.ok) throw new Error("Failed to post");
        alert("Post submitted successfully!");
      } catch (error) {
        console.error("Submit error:", error);
        alert("There was an error submitting your post.");
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const maxFiles = formik.values.mediaType === "carousel" ? 6 : 1;
    const selectedFiles = fileArray.slice(0, maxFiles);

    formik.setFieldValue("media", selectedFiles);
    setPreviewUrls(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <Layout>
      <section id="promotion" className="bg-[rgb(249,244,244)] pt-3">
        <img src={gradimg} alt="sportlaze logo" className="ml-3" />
        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          minHeight="100vh"
          bgcolor="#f9f4f4"
        >
          {/* Sidebar */}
          <Box
            width={{ xs: "100%", lg: "20%" }}
            p={3}
            color="blue"
            fontWeight="500"
          >
            <Typography borderLeft={"4px solid blue"} pl={1} mb={2}>
              Post Details
            </Typography>
            <Typography pl={1} mb={2}>
              Ads Target
            </Typography>
            <Typography pl={1}>Payment</Typography>
          </Box>

          {/* Main Content */}
          <Box
            flex={1}
            border={3}
            borderColor={"gray"}
            bgcolor={"white"}
            sx={{ maxWidth: "60rem", borderRadius: "1rem" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={3}
              borderColor={"gray"}
              padding={2}
              mb={3}
            >
              <Typography variant="h5" fontWeight="600" color="primary">
                Post details
              </Typography>
              <Box display="flex" gap={2} fontSize="0.9rem">
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  <img src={uploadicon} alt="existig" className="mr-2" />
                  Use existing ad
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  <img src={createAds} alt="create" className="mr-2" />
                  Create New Ad
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  <img src={copyicon} alt="CopyAd" className="mr-2" />
                  Copy ad
                </Button>
                <Button
                  variant="text"
                  color="error"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  <img src={deleteIcon} alt="deleteAds" className="mr-2" />
                  Delete
                </Button>
              </Box>
            </Box>

            <div className="flex justify-between">
              {/* Form Card */}
              <div>
                <Paper
                  variant="outlined"
                  sx={{ borderColor: "transparent", p: 3 }}
                >
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {user.profile_picture ? (
                      <Avatar
                        src={user.profile_picture}
                        sx={{ width: 70, height: 70 }}
                      />
                    ) : (
                      <Avatar sx={{ width: 70, height: 70 }}>
                        {user.username && user.username[0].toLocaleUpperCase()}
                      </Avatar>
                    )}
                    <Box display={"flex"} gap={1}>
                      <Typography fontWeight={600}>
                        {user.name && user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.username && user.username}
                      </Typography>
                    </Box>
                  </Box>

                  <form
                    onSubmit={formik.handleSubmit}
                    className="max-w-md mx-auto mt-10 space-y-4 font-sans text-sm"
                  >
                    <textarea
                      name="postText"
                      placeholder="What is happening?"
                      onChange={formik.handleChange}
                      value={formik.values.postText}
                      className="w-full h-24 p-3 border border-blue-600 rounded-lg focus:outline-none"
                    />

                    <div className="flex space-x-2">
                      <div
                        className={`w-1/2 p-4 border rounded-lg cursor-pointer ${
                          formik.values.mediaType === "single"
                            ? "border-blue-600"
                            : "border-blue-300"
                        }`}
                        onClick={() =>
                          formik.setFieldValue("mediaType", "single")
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Single Media</span>
                          <div className="w-3 h-3 border border-blue-600 rounded-full flex items-center justify-center">
                            {formik.values.mediaType === "single" && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs mt-1">1 photo or video</p>
                      </div>
                      <div
                        className={`w-1/2 p-4 border rounded-lg cursor-pointer ${
                          formik.values.mediaType === "carousel"
                            ? "border-blue-600"
                            : "border-blue-300"
                        }`}
                        onClick={() =>
                          formik.setFieldValue("mediaType", "carousel")
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Carousel</span>
                          <div className="w-3 h-3 border border-blue-600 rounded-full flex items-center justify-center">
                            {formik.values.mediaType === "carousel" && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs mt-1">2-6 photo or video</p>
                      </div>
                    </div>

                    <div className="border border-blue-600 rounded-lg p-2 space-y-2">
                      <div className="flex items-center border border-blue-600 rounded-lg px-3 py-2">
                        <input
                          type="text"
                          placeholder="Media"
                          value={
                            formik.values.media.length
                              ? `${formik.values.media.length} file(s) selected`
                              : ""
                          }
                          disabled
                          className="flex-1 outline-none bg-transparent cursor-default"
                        />
                        <label className="text-black underline text-sm cursor-pointer">
                          Upload
                          <input
                            type="file"
                            accept="image/*,video/*"
                            multiple={formik.values.mediaType === "carousel"}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <input
                        name="headline"
                        placeholder="Headline"
                        onChange={formik.handleChange}
                        value={formik.values.headline}
                        className="w-full border border-blue-600 rounded-lg px-3 py-2 outline-none"
                      />
                      <input
                        name="url"
                        placeholder="Website Url"
                        onChange={formik.handleChange}
                        value={formik.values.url}
                        className="w-full border border-blue-600 rounded-lg px-3 py-2 outline-none"
                      />
                    </div>

                    {/* <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Post
                    </button> */}
                  </form>
                </Paper>
              </div>

              {/* Preview Card */}
              <div className="mr-6">
                <Paper
                  variant="outlined"
                  sx={{
                    borderColor: "blue",
                    p: 3,
                    borderRadius: "1rem",
                    width: "20rem",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {user.profile_picture ? (
                      <Avatar
                        src={user.profile_picture}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <Avatar sx={{ width: 40, height: 40 }}>
                        {user.username && user.username[0].toLocaleUpperCase()}
                      </Avatar>
                    )}
                    <Box>
                      <Typography fontWeight={600}>
                        {user.name && user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.username && user.username}
                      </Typography>
                    </Box>
                  </Box>
                  {/* if what's hapening is typed replace it with the text */}
                  <Typography mb={2}>
                    {formik.values.postText ? (
                      formik.values.postText
                    ) : (
                      <em style={{ color: "#888" }}>What is happening?</em>
                    )}
                  </Typography>{" "}
                  {/* this should contain the images or video preview in carousel */}
                  <Box display="flex" overflow="auto" gap={1} mb={2}>
                    {previewUrls.length > 0 ? (
                      previewUrls.map((url, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={url}
                          alt={`media-${index}`}
                          height={150}
                          sx={{ borderRadius: 2 }}
                        />
                      ))
                    ) : (
                      <div
                      className="h-[18rem] w-full rounded-md mb-2 bg-slate-300"
                        // height={200}
                        // borderRadius={2}
                        // mb={2}
                        // bgcolor={"gray"}
                        // sx={{ background: "gray" }}
                      />
                    )}
                  </Box>

                  <Typography variant="body2" mb={1}>
                    {formik.values.headline || (
                      <em style={{ color: "#888" }}>Headline</em>
                    )}
                  </Typography>

                  <Typography
                    variant="caption"
                    fontStyle="italic"
                    color="text.secondary"
                  >
                    {formik.values.url
                        ? (() => {
                            try {
                              const urlWithProtocol =
                                formik.values.url.startsWith("http")
                                  ? formik.values.url
                                  : `https://${formik.values.url}`;
                              const hostname = new URL(urlWithProtocol).hostname;
                              return `From ${hostname}`;
                            } catch {
                              return "From website.com";
                            }
                          })()
                      : "From website.com"}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    fontSize="1.25rem"
                  >
                    <span>♡</span>
                    <span>💬</span>
                    <span>📤</span>
                    <span>🔖</span>
                  </Box>
                  <Typography
                    variant="caption"
                    color="primary"
                    fontWeight={500}
                    fontSize={15}
                    sx={{ display: "flex", gap: "1rem" }}
                    mt={2}
                  >
                    <img src={promotionIcon} alt="promotion img" />{" "}
                    <p>Promoted</p>
                  </Typography>
                </Paper>
              </div>
            </div>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderTop={3}
              borderColor={"gray"}
              padding={2}
            >
              <Typography color="primary">
                Back
              </Typography>
              <Box display="flex" gap={2} fontSize="0.9rem">
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  Exit
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  Save to Draft
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  Launch Promotion
                </Button>
              </Box>
            </Box>

          </Box>
        </Box>
      </section>
    </Layout>
  );
};
