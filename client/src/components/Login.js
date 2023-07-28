import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    emailInputRef.current.value = localStorage.getItem("email");
    passwordInputRef.current.value = localStorage.getItem("password");

    //validateToken();
  }, []);

  let validateCredentials = async () => {
    let fd = new FormData();
    fd.append("email", emailInputRef.current.value);
    fd.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: fd,
    };

    let JSONData = await fetch("/validateLogin", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
    if (JSOData.isLoggedIn == false) {
      alert(JSOData.msg);
    } else {
      // localStorage.setItem("email", emailInputRef.current.value);
      // localStorage.setItem("password", passwordInputRef.current.value);
      localStorage.setItem("token", JSOData.token);
      navigate("/home", { state: JSOData.details });
    }
  };

  let validateToken = async () => {
    if (localStorage.getItem("token")) {
      let fd = new FormData();
      fd.append("token", localStorage.getItem("token"));

      let reqOptions = {
        method: "POST",
        body: fd,
      };

      let JSONData = await fetch("/validateToken", reqOptions);

      let JSOData = await JSONData.json();

      console.log(JSOData);
      if (JSOData.isLoggedIn == false) {
        alert(JSOData.msg);
      } else {
        localStorage.setItem("token", JSOData.token);
        navigate("/home", { state: JSOData.details });
      }
    }
  };

  return (
    <div className="App">
      <form>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              validateCredentials();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Login;
