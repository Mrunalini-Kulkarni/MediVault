import { create } from 'zustand';

type UserState = {
  privateKey: string;
  publicKey: string;
  setKeys: (privateKey: string, publicKey: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  privateKey: '',
  publicKey: '',
  setKeys: (privateKey, publicKey) => set({ privateKey, publicKey }),
}));
