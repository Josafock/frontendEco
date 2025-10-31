'use client';

import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export default function ToastNotification() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="colored"
      transition={Slide}
      toastClassName="rounded-xl shadow-lg"
      className="text-sm font-medium"
    />
  );
}
