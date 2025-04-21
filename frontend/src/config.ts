const isDev = import.meta.env.MODE === 'development';

export const API_URL = isDev ? 'http://localhost:4000' : 'http://34.232.21.31:3000';
export const ESP32_IP = import.meta.env.VITE_ESP32_IP || '192.168.0.100';
export const CAMERA_IP = import.meta.env.VITE_CAMERA_IP || '192.168.29.77';