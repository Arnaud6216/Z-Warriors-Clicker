/// <reference types="vite/client" />
// This provides types for the Vite-injected env variables on import.meta.env
// See https://vite.dev/guide/features.html#client-types

export interface OptionProps {
  label: string;
  isAvailable: boolean;
  onClick: () => void;
  className: string;
  title: string;
}

export interface Ennemy {
  id: number;
  name: string;
  img_src: string;
  life: number;
}

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};
