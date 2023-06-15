import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AllProducts from "./pages/home";
import ProductDetail from "./pages/detail";
import Layout from "./components/layout/index";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate replace to="/products" />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
