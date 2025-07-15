import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/pages/Layout";
import TasksPage from "@/components/pages/TasksPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TasksPage />} />
          <Route path="category/:categoryId" element={<TasksPage />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="font-inter"
        bodyClassName="text-sm"
      />
    </div>
  );
}

export default App;