import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Login from "./UserPage/Login/Login";
import Home from "./UserPage/Home/Home";
import Booking from "./UserPage/Booking/Booking";
import Booking2 from "./UserPage/Booking/Booking2";
import Booking3 from "./UserPage/Booking/Booking3";
import CheckRoom from "./UserPage/CheckRoom/CheckRoom";
import CheckRoom2 from "./UserPage/CheckRoom/CheckRoom2";
import Reservations from "./UserPage/Reservations/Reservations";
import ReservationTwo from "./UserPage/Reservations/ReservationTwo";
import ReservationWait from "./UserPage/Reservations/ReservationWait";
import ReservationYes from "./UserPage/Reservations/ReservationYes";
import ReservationNot from "./UserPage/Reservations/ReservationNot";
import CancelReserva from "./UserPage/Cancel/CancelReserva";
import CancelLast from "./UserPage/Cancel/CancelLast";
import CheckAvailabilityForPublic from "./UserPage/publicUser/CheckAvailability";

import AdminHome from "./AdmindPage/Home/AdminHome";
import RoomRec from "./AdmindPage/Room Recording/RoomRec";
import RoomRec2 from "./AdmindPage/Room Recording/RoomRec2";
import RoomRec3 from "./AdmindPage/Room Recording/RoomRec3";
import EditRoom from "./AdmindPage/EditRoom/EditRoom";
import EditRoom2 from "./AdmindPage/EditRoom/EditRoom2";
import EditRoom3 from "./AdmindPage/EditRoom/EditRoom3";
import AdminCheck1 from "./AdmindPage/CheckRoom/AdminCheck1";
import AdminCheck2 from "./AdmindPage/CheckRoom/AdminCheck2";
import AdmindReservation from "./AdmindPage/Reservations/AdmindReservation";
import AdmindReservationNo from "./AdmindPage/Reservations/AdmindReservationNo";
import AdmindReservationYes from "./AdmindPage/Reservations/AdmindReservationYes";
import AdmindReservationWait from "./AdmindPage/Reservations/AdmindReservationWait";
import HomeAdd from "./AdmindPage/AdmindTwo/Home";
import AdmindReserTwo from "./AdmindPage/AdmindTwo/AdmindReserTwo";
import CheckAvailability from "./UserPage/publicUser/check";
import CheckAvailability2 from "./UserPage/publicUser/checkP2";
import RoomData from "./AdmindPage/RecordRoomData/RoomData";
import AdminReservationDetail from "./AdmindPage/Reservations/AdminReservationDetail";
import ReservationDetailTwo from "./AdmindPage/AdmindTwo/ReservationDetailTwo";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element ={<Home />} />
          
          <Route path="/Booking" element ={<Booking />} />
          <Route path="/Booking/booking2" element ={<Booking2/>}/>
          <Route path="/Booking/booking2/booking3" element ={<Booking3/>}/>
          <Route path="/checkRoom" element={<CheckRoom/>} />
          <Route path="/checkRoom/checkRoom2" element={<CheckRoom2/>} />
          <Route path="/reservations" element ={<Reservations />} />
          <Route path="/reservations/reservationTwo/:reservationId" element={<ReservationTwo />} />
          <Route path="/reservations/reservationWait" element ={<ReservationWait />} /> 
          <Route path="/reservations/reservationYes" element ={<ReservationYes />} />
          <Route path="/reservations/reservationNot" element ={<ReservationNot />} />
          <Route path="/cancelReserva" element={<CancelReserva />} />
          <Route path="/cancelReserva/cancelList" element={<CancelLast />} />
          <Route path="/AdmindReservations/AdmindReservationsDetail/:reservationId" element= {<AdminReservationDetail/>} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/RoomRecording" element={<RoomRec/>} />
          <Route path="/RoomRecording/RoomRecording2" element={<RoomRec2/>} />
          <Route path="/RoomRecording/RoomRecording2/RoomRecording3" element={<RoomRec3/>} />
          <Route path="/EditRoom" element={<EditRoom />} />
          <Route path="/EditRoom/EditRoom2" element={<EditRoom2 />} />
          <Route path="/EditRoom/EditRoom2/EditRoom3"element={<EditRoom3 />} />
          <Route path="/AdmindReservations" element ={<AdmindReservation/>} />
          <Route path="/AdmindReservations/ReservationsYes" element ={<AdmindReservationYes/>} />
          <Route path="/AdmindReservations/ReservationsNo" element ={<AdmindReservationNo/>} />
          <Route path="/AdmindReservations/ReservationsWait" element ={<AdmindReservationWait/>} />
          <Route path="/AdminCheckRoom" element ={<AdminCheck1/>} />
          <Route path="/AdminCheckRoom/AdminCheckRoom1" element={<AdminCheck2 />} />
          <Route path="/AdminHomeTwo" element={<HomeAdd/>} />
          <Route path="/AdmindReserTwo" element={<AdmindReserTwo/>} />
          <Route path="/AdmindReserTwo/ReservationsDetailTwo/:reservationId" element= {<ReservationDetailTwo/>} />
         <Route path="/checkRoomPublic" element ={<CheckAvailability/>} />
         <Route path="/checkRoomPublic/checkRoomPublic2" element ={<CheckAvailability2/>} />
         <Route path="/RoomData" element ={<RoomData/>} />
         <Route path="/CheckAvailabilityForPublic" element={<CheckAvailabilityForPublic />} />
         
        
        </Routes>
      </div>
    </Router>
  );
};
export default App;
