import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://games-mloc.vercel.app/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getApps = () => api.get('/apps');
export const getRecentApps = () => api.get('/apps/recent');
export const addApp = (data, adminPassword) => api.post('/apps', data, {
  headers: { Authorization: `Bearer ${adminPassword}` }
});
export const deleteApp = (id, adminPassword) => api.delete(`/apps/${id}`, {
  headers: { Authorization: `Bearer ${adminPassword}` }
});
export const uploadLogo = async (file, adminPassword) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${adminPassword}`
    },
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Upload failed");
  }
  return { data };
};
export const sendContactMessage = (data) => api.post('/contact', data);

export default api;
