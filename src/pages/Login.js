import React from "react";
import { Link, useHistory } from "react-router-dom";
import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Logo from "../assets/login/logo.png";

function Login() {
  const navigate = useHistory();
  const onSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: decoded.email }),
      });

      if (response.ok) {
        const userData = await response.json();
        const { userID, token, role, Name } = userData;
        console.log("Login Success! User Email:", decoded.email);

        localStorage.setItem("email", decoded.email);
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userID);
        localStorage.setItem("role", role);
        localStorage.setItem("name", Name);

        if (role === "0") {
          navigate.push("/app/login");
        }
        if (role === "1") {
          navigate.push("/app/admin-home");
        } else if (role === "2") {
          navigate.push("/app/faculty-home");
        } else if (role === "3") {
          navigate.push("/app/parent-home");
        } else {
          navigate.push("/app/security-home");
        }
      } else {
        console.log("Failed to send email to the API.");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const onError = () => {
    console.log("Login Failed");
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={Logo}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={Logo}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                />
              </Label>

              <Button className="mt-4" block tag={Link} to="/app/admin-home">
                Log in
              </Button>

              <hr className="my-8" />
              <GoogleOAuthProvider clientId="756732808729-bujv1cdpv4j4asj4sn5po296e4kr60pm.apps.googleusercontent.com">
                <div className="flex justify-center">
                  <GoogleLogin onSuccess={onSuccess} onError={onError} />
                </div>
              </GoogleOAuthProvider>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
