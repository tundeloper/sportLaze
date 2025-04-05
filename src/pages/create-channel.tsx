import { useState } from "react";
import Layout from "../components/layout/layout";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { createChannelSchema } from "../utils/validator";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { url } from "inspector";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CreateChannel() {
  const [description, setDescription] = useState("");
  const [selectedLounge, setSelectedLounge] = useState("Soccer");
  const maxCharCount = 244;
  const url = baseUrl();

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
              // Simulate a network request
              const { data } = await axios.post(
                `${url}/channels/${"loungeID"}`,
                values
              );
              console.log(data);
              try {
              } catch (error) {
                console.error("Error creating channel:", error);
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

                <Field type="checkbox" name="status" id="terms">
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
                </Field>
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
