import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { createChannelSchema } from "../utils/validator";
import axios, { isAxiosError } from "axios";
import baseUrl from "../utils/baseUrl";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSportlaze } from "../hooks/useContext";

export default function CreateChannel() {
  const [description, setDescription] = useState("");
  const [selectedLounge, setSelectedLounge] = useState("Soccer");
  const maxCharCount = 244;
  const url = baseUrl();
  const {id} = useParams()
  const {setSnackIsOpen, setMessage} = useSportlaze()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${url}/lounges/`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `${localStorage.getItem("acess_token")}`
          },
        });
        console.log('channel')
        const found = data.find((item : any) => 'id' in item)
        console.log(found, 'found')
        setSelectedLounge('data');
      } catch (error) {
        console.error("Error fetching lounges:", error);
      } finally {
      }
    })()
  }, [])

  return (
    <Layout>
      <div className="flex flex-col items-center p-6 min-h-screen bg-[#f9f2f2]">
        {/* Floating Create Button */}
        <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-100 transition-all">
          + Create Channels
        </button>

        {/* Form Container */}
        <div className="mt-8 w-full max-w-lg p-6 rounded-lg">
          <Formik
            initialValues={{ channel_name: "", channel_description: "" }}
            validationSchema={createChannelSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { data } = await axios.post(
                  `${url}/channels/${id}`,
                  {
                    name: values.channel_name,
                    description: values.channel_description,
                    is_private: false,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                  }
                );
                if (data) {
                  console.log(data);
                  setSnackIsOpen(true)
                  setMessage({message: "Channel Created Successfully", error: false})
                  navigate(`/channels/${id}`)
                }
              } catch (error) {
                if(isAxiosError(error)) {
                  setSnackIsOpen(true)
                  setMessage({message: error.response?.data.detail, error: true})
                  console.log(error.response?.data.detail);
                }
              } finally {
                setSubmitting(false);
                setTimeout(() => {
                  setSnackIsOpen(false);
                  setMessage({message: "", error: false})
                  setSubmitting(false);
                }, 5000);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor="chanel_name"
                  >
                    Name of Channel
                  </label>
                  <Field
                    className={`w-full p-3 border border-gray-400 bg-transparent text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors ? "border-[rgb(190, 63, 13)]" : "border-[white]"
                    }`}
                    placeholder="Type Name of Channel"
                    name="channel_name"
                    type="text"
                    id="channel_name"
                  />
                  <ErrorMessage
                    name="channel_name"
                    component="div"
                    className={`text-[red] text-[12px] ${errors && "mb-4"}`}
                  />
                </div>
                {/* Channel Description */}
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  placeholder="Type Description"
                  className="w-full p-3 border border-gray-400 bg-transparent text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  name="description"
                  id="description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={`text-[red] text-[12px]`}
                />

                {/* <Field type="checkbox" name="status" id="terms">
                  {({ field }: FieldProps) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value}
                          sx={{ transform: "scale(1.5)" }} // increase size
                          color="primary"
                        />
                      }
                      label="Is this channel public?"
                      className="ml-2 text-sm text-gray-700"
                    />
                  )}
                </Field> */}
                {/* <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  is this channel public?
                </label> */}
                {/* <div className="text-right text-gray-500 text-sm mt-[-1rem]">
                  {maxCharCount - description.length}
                </div> */}

                {/* Lounges */}
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="lounges"
                >
                  Lounges
                </label>
                <div className="flex gap-2" id="lounges">
                  <button className="px-4 py-2 border rounded-full bg-gray-200 text-gray-700 font-medium">
                    {selectedLounge}
                  </button>
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full mt-6 bg-secondary text-white py-3 rounded-lg text-lg font-semibold hover:bg-secondary20 transition-all"
                >
                  Create Channel
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
