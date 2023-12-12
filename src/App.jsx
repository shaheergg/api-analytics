import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ip-settings" element={<h1>IP Settings</h1>} />
          </Route>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
