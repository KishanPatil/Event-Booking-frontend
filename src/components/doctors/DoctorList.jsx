import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../store/slice/doctorSlice";
import DoctorCard from "../../components/doctors/DoctorCard";
import AppointmentForm from "../appointments/AppointmentForm";

const DoctorList = () => {
  const dispatch = useDispatch();
  const { doctors, status } = useSelector((state) => state.doctors);

  const [selectedDoctor, setSelectedDoctor] = React.useState(null);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  if (status === "loading") return <p>Loading doctors...</p>;
  if (status === "failed") return <p>Error fetching doctors</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctors</h2>
      {doctors?.map((doc) => (
        <DoctorCard
          key={doc?.doctorId}
          doctor={doc}
          onView={(doctor) => alert(`Viewing profile: ${doctor?.name}`)}
          onBook={(doctor) => setSelectedDoctor(doctor)}
        />
      ))}

      {selectedDoctor && (
        <div style={{ marginTop: "20px" }}>
          <h3>Book Appointment with {selectedDoctor?.name}</h3>
          <AppointmentForm
            doctorId={selectedDoctor.doctorId}
            onBooked={() => setSelectedDoctor(null)}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorList;
