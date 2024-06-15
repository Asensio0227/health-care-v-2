import React, { useContext } from 'react';

const AppContext = React.createContext({
  adminUser: null,
  setAdminUser: () => {},
  users: null,
  setUsers: () => {},
  isPasswordShown: false,
  setIsPasswordShown: () => {},
  appointment: [],
  setAppointment: () => {},
  patient: [],
  setPatien: () => {},
  rooms: [],
  setRooms: () => {},
  unFilteredRooms: [],
  setUnFilteredRooms: () => {},
});
export function useGlobalContext() {
  return useContext(AppContext);
}

export default AppContext;
