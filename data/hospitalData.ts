import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HospitalData {
  name: string;
  registrationNumber: string;
  contact: string;
  email: string;
  password: string;
  address: string;
}

const STORAGE_KEY = "registeredHospitals";

export const mockHospitals: HospitalData[] = [
  {
    name: "Apollo Hospitals",
    registrationNumber: "HOSP001",
    contact: "1234567890",
    email: "apollo@example.com",
    password: "test123",
    address: "Delhi, India",
  },
];

export async function saveHospital(hospital: HospitalData): Promise<void> {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  let hospitals: HospitalData[] = jsonValue ? JSON.parse(jsonValue) : [...mockHospitals];
  hospitals.push(hospital);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(hospitals));
}

export async function fetchHospitals(): Promise<HospitalData[]> {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue ? JSON.parse(jsonValue) : [...mockHospitals];
}

export async function validateHospitalLogin(registrationNumber: string, password: string): Promise<HospitalData | null> {
  const hospitals = await fetchHospitals();
  return (
    hospitals.find(
      (h) =>
        h.registrationNumber.toLowerCase() === registrationNumber.toLowerCase() &&
        h.password === password
    ) || null
  );
} 