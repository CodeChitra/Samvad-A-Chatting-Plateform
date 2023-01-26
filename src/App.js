import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";


function App() {
  const { currentUser } = useContext(AuthContext);
  console.log("Current User: ", currentUser);

  const ProtectedRoute = (props) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return props.children;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
