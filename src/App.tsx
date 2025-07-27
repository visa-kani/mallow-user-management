import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Loader } from "./component/loader";

const Login = lazy(() =>
  import("./pages/login").then((module) => ({ default: module.Login }))
);
const UserManagement = lazy(() =>
  import("./pages/user-management").then((module) => ({
    default: module.UserManagement,
  }))
);

function App() {
  const userData = useSelector((store: any) => store.loginDetails.loginData);

  return (
    <div>
      <BrowserRouter>
        <Suspense
          fallback={
            <div>
              <div className="flex items-center justify-center h-[100vh]">
                <Loader />
              </div>
            </div>
          }
        >
          <Routes>
            {!userData ? (
              <Route path="/" element={<Login />} />
            ) : (
              <>
                <Route path="/user-management" element={<UserManagement />} />
              </>
            )}
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: { background: "#fff", color: "#000" },
          success: {
            duration: 3000,
            style: { background: "#fff", color: "#3c763d" },
          },
          error: {
            style: { background: "#fff", color: "#000" },
            duration: 2000,
          },
        }}
      />
    </div>
  );
}

export default App;
