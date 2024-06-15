import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import AppContext from './context';

function Wrapper({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [appointment, setAppointment] = useState([]);
  const [patient, setPatient] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [unFilteredRooms, setUnFilteredRooms] = useState([]);

  return (
    <AppContext.Provider
      value={{
        adminUser,
        setAdminUser,
        users,
        setUsers,
        isPasswordShown,
        setIsPasswordShown,
        appointment,
        setAppointment,
        patient,
        setPatient,
        rooms,
        setRooms,
        unFilteredRooms,
        setUnFilteredRooms,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default Wrapper;
