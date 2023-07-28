import React from "react";
import { useNavigate } from "react-router-dom";

function TopNavigation(props) {
  let navigate = useNavigate();
  return (
    <nav>
      <button
        type="button"
        onClick={() => {
          navigate("/editProfile", { state: props.userDetails });
        }}
      >
        Edit Profile
      </button>
      <button
        type="button"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default TopNavigation;
