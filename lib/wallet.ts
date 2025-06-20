import * as SecureStore from 'expo-secure-store';

export async function saveKeys(privateKey: string, publicKey: string) {
  await SecureStore.setItemAsync('privateKey', privateKey);
  await SecureStore.setItemAsync('publicKey', publicKey);
}

export async function getKeys() {
  const privateKey = await SecureStore.getItemAsync('privateKey');
  const publicKey = await SecureStore.getItemAsync('publicKey');
  return { privateKey, publicKey };
}

export async function clearKeys() {
  await SecureStore.deleteItemAsync('privateKey');
  await SecureStore.deleteItemAsync('publicKey');
}
