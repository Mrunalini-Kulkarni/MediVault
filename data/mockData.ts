export interface PatientData {
  Name: string;
  age: string;
  contact: string;
  email: string;
  bloodGroup: string;
  disabilities: string;
  diseases: string;
  gender: string;
  password: string;
}

// Mock registered patients data array
export const mockPatients: PatientData[] = [
  {
    Name: "Jane Doe",
    age: "29",
    contact: "+1234567890",
    email: "jane.doe@example.com",
    bloodGroup: "A+",
    disabilities: "None",
    diseases: "Asthma",
    gender: "Female",
    password: "password123",
  },
  {
    Name: "John Smith",
    age: "35",
    contact: "+1987654321",
    email: "john.smith@example.com",
    bloodGroup: "O-",
    disabilities: "Color blindness",
    diseases: "None",
    gender: "Male",
    password: "mypassword",
  },
];

// Helpers to store/fetch patients from AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "registeredPatients";

// Save new patient (register)
export async function savePatient(patient: PatientData): Promise<void> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    let patients: PatientData[] = jsonValue ? JSON.parse(jsonValue) : [...mockPatients];
    patients.push(patient);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  } catch (e) {
    console.error("Error saving patient:", e);
  }
}

// Fetch all patients (for login validation)
export async function fetchPatients(): Promise<PatientData[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    } else {
      // No saved data, return mock
      return [...mockPatients];
    }
  } catch (e) {
    console.error("Error fetching patients:", e);
    return [...mockPatients];
  }
}

// Validate login credentials
export async function validateLogin(username: string, password: string): Promise<PatientData | null> {
  const patients = await fetchPatients();

  // username can be email or contact
  const user = patients.find(
    (p) => (p.email.toLowerCase() === username.toLowerCase() || p.contact === username) && p.password === password
  );
  return user || null;
}
