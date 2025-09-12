import React, { useState } from "react";
import { useSelector } from "react-redux";
import DoctorList from "./DoctorList";
import AddDoctorModal from "../../components/doctors/AddDoctorModal";
import { CustomButton } from "../commonUI";

const Doctors = () => {
  const { role } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <DoctorList />

      {role === "Admin" && (
        <div style={{ position: "absolute", top: 20, right: 20 }}>
          <CustomButton label="Add Doctor" onClick={() => setOpenModal(true)} />
        </div>
      )}

      <AddDoctorModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Doctors;
