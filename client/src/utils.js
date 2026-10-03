import { toast } from 'react-toastify';

export const API_BASE_URL = 'https://rewear-3bep.onrender.com';

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: 'top-right'
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: 'top-right'
  });
};