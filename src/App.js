import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Car from "./pages/dashboard/car/Car";
import News from "./pages/dashboard/news/News";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/car" element={<Car />}>
        </ Route>
        <Route path="/dashboard/news" element={<News />}>
        </ Route>
      </ Route>
    </Routes>
  );
}

export default App;
