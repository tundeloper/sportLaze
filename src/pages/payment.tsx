import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  Box,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  Edit as EditIcon,
  CreditCard as CreditCardIcon,
} from "@mui/icons-material";
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
import { NavLink } from "react-router-dom";

export const Payment = () => {
  const { user } = useSportlaze();
  const [isEditingObjective, setIsEditingObjective] = useState(false);
  const [objective, setObjective] = useState("Sales");
  const [objectiveDesc, setObjectiveDesc] = useState(
    "Promote your website and drive sales"
  );

  const [openCardModal, setOpenCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSaveObjective = () => {
    setIsEditingObjective(false);
  };

  const handleOpenCardModal = () => {
    setOpenCardModal(true);
  };

  const handleCloseCardModal = () => {
    setOpenCardModal(false);
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  return (
    <Layout>
      <section id="adsTarget" className="bg-[rgb(249,244,244)] pt-3">
        <img src={gradimg} alt="sportlaze logo" className="ml-6" />
        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          minHeight="100vh"
          bgcolor="#f9f4f4"
          gap={6}
        >
          {/* Sidebar */}
          <div className="text-[blue] p-6 flex flex-col">
            <NavLink
              to="/promotion"
              className={({ isActive }) =>
                `pl-1 mb-2 border-l-4 ${isActive ? "border-[blue]" : ""}`
              }
            >
              Post Details
            </NavLink>
            <NavLink
              to="/ads-target"
              className={({ isActive }) =>
                `pl-1 mb-2 border-l-4 ${isActive ? "border-[blue]" : ""}`
              }
            >
              Ads Target
            </NavLink>
            <NavLink
              to="/payment"
              className={({ isActive }) =>
                `pl-1 mb-2 border-l-4 ${isActive ? "border-[blue]" : ""}`
              }
            >
              Payment
            </NavLink>
          </div>

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
                Payment
              </Typography>
            </Box>

            <div className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              {/* Objective Section */}
              <div className="space-y-3">
                <Typography
                  variant="subtitle2"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Objective
                </Typography>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg px-4 py-3 space-y-2 sm:space-y-0">
                  {isEditingObjective ? (
                    <div className="flex flex-col space-y-2 w-full">
                      <TextField
                        label="Objective"
                        size="small"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        fullWidth
                      />
                      <TextField
                        label="Description"
                        size="small"
                        value={objectiveDesc}
                        onChange={(e) => setObjectiveDesc(e.target.value)}
                        fullWidth
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleSaveObjective}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <Typography
                          variant="body1"
                          className="font-semibold text-[gray] text-sm sm:text-base"
                        >
                          {objective}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-gray-500 text-xs sm:text-sm"
                        >
                          {objectiveDesc}
                        </Typography>
                      </div>
                      <Button
                        variant="text"
                        startIcon={<EditIcon />}
                        size="small"
                        onClick={() => setIsEditingObjective(true)}
                        className="whitespace-nowrap"
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-3">
                <Typography
                  variant="subtitle2"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Name
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Enter name"
                  inputProps={{ maxLength: 244 }}
                />
                <div className="text-right text-xs text-gray-400">244</div>
              </div>

              {/* Credit Card Section */}
              <div className="space-y-3">
                <Typography
                  variant="subtitle2"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Credit Card
                </Typography>


                <Card variant="outlined" className="border-dashed">
                <Alert severity="warning" className="text-xs sm:text-sm">
                  You have no eligible payment methods.
                </Alert>
                  <CardContent className="flex flex-col items-center space-y-5 py-10">
                    <CreditCardIcon
                      className="text-gray-400"
                      fontSize="large"
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="text-xs sm:text-sm"
                    >
                      No payment method selected
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      className="text-xs sm:text-sm"
                      onClick={handleOpenCardModal}
                    >
                      + Add Credit Card
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Add Credit Card Modal */}
              <Dialog open={openCardModal} onClose={handleCloseCardModal}>
                <DialogTitle>Add Credit Card</DialogTitle>
                <DialogContent className="space-y-4 mt-2">
                  <div className="pt-2">
                    <TextField
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <TextField
                      label="Expiry Date"
                      variant="outlined"
                      fullWidth
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <TextField
                      label="CVV"
                      variant="outlined"
                      fullWidth
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCardModal}>Cancel</Button>
                  <Button variant="contained" onClick={handleCloseCardModal}>
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderTop={3}
              borderColor={"gray"}
              padding={2}
            >
              <Typography color="primary">Back</Typography>
              <Box display="flex" gap={2} fontSize="0.9rem">
                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  Exit
                </Button>

                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2",
                    textTransform: "capitalize",
                    // textDecoration: "underline",
                    padding: "1rem",
                    border: "1px solid #1976d2",
                    borderRadius: "2px",
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </Layout>
  );
};
