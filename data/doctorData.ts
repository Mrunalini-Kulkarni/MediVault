import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DoctorData {
  name: string;
  specialization: string;
  contact: string;
  email: string;
  password: string;
}

const STORAGE_KEY = "registeredDoctors";

export const mockDoctors: DoctorData[] = [
  {
    name: "Dr. Jane Smith",
    specialization: "Cardiology",
    contact: "1234567890",
    email: "jane.smith@example.com",
    password: "test123",
  },
];

export async function saveDoctor(doctor: DoctorData): Promise<void> {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  let doctors: DoctorData[] = jsonValue ? JSON.parse(jsonValue) : [...mockDoctors];
  doctors.push(doctor);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
}

export async function fetchDoctors(): Promise<DoctorData[]> {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue ? JSON.parse(jsonValue) : [...mockDoctors];
}

export async function validateDoctorLogin(username: string, password: string): Promise<DoctorData | null> {
  const doctors = await fetchDoctors();
  return (
    doctors.find(
      (d) =>
        (d.email.toLowerCase() === username.toLowerCase() || d.contact === username) &&
        d.password === password
    ) || null
  );
}
