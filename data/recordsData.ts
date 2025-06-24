import AsyncStorage from "@react-native-async-storage/async-storage";

export interface MedicalRecord {
  id: string;
  patientName: string;
  date: string;
  type: string;
  description: string;
}

const STORAGE_KEY = "medicalRecords";

// Fetch records
export async function fetchRecords(): Promise<MedicalRecord[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error fetching records:", e);
    return [];
  }
}

// Save a new record
export async function saveRecord(record: MedicalRecord): Promise<void> {
  try {
    const existing = await fetchRecords();
    existing.push(record);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error("Error saving record:", e);
  }
}
