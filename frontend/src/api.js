import axios from 'axios';

export const getApps = () => axios.get(`${import.meta.env.VITE_API_URL}/api/apps`);

export const getRecentApps = () => axios.get(`${import.meta.env.VITE_API_URL}/api/apps/recent`);

export const addApp = (data, adminPassword) => axios.post(`${import.meta.env.VITE_API_URL}/api/apps`, data, {
  headers: { Authorization: `Bearer ${adminPassword}` }
});

export const deleteApp = (id, adminPassword) => axios.delete(`${import.meta.env.VITE_API_URL}/api/apps/${id}`, {
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

export const sendContactMessage = (data) => axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, data);
