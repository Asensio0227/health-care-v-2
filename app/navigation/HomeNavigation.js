import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import colors from '../config/colors';
import ConscentScreen from '../screens/ConscentScreen';
import CreateScreen from '../screens/CreateScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditScreen from '../screens/EditScreen';
import MedicalRecord from '../screens/MedicalRecord';
import PatienceScreen from '../screens/PatienceScreen';
import PatientInfoScreen from '../screens/PatientInfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import NewPatientButton from './NewPatientButton';

const Stack = createNativeStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.secondary }}>
      <Stack.Screen
        name='Patience'
        component={PatienceScreen}
        options={{
          headerRight: () => <NewPatientButton />,
        }}
      />
      <Stack.Screen
        options={{ headerTitle: 'Medical Record ' }}
        name='UpdateInfo'
        component={MedicalRecord}
      />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen
        options={{
          headerTitle: 'Add Patient Account',
        }}
        name='Create'
        component={CreateScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='Details'
        component={DetailsScreen}
      />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Edit' component={EditScreen} />
      <Stack.Screen
        options={{
          headerTitle: 'Personal info ',
        }}
        name='Info'
        component={PatientInfoScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Update info ',
        }}
        name='updateInfo'
        component={ConscentScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
