import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavigation from "./TopNavigation";

function Home() {
  let loc = useLocation();
  let navigate = useNavigate();
  console.log(loc);

  let deleteUser = async () => {
    let reqOptions = {
      method: "DELETE",
    };

    let url = `/deleteUser?id=${loc.state._id}`;
    console.log(url);

    let JSONData = await fetch(url, reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
    if (JSOData.status == "success") {
      navigate("/");
    }
  };

  return (
    <div>
      <TopNavigation userDetails={loc.state} />
      <button
        onClick={() => {
          deleteUser();
        }}
      >
        Delete Account
      </button>
      <h1>Welcome {loc.state.fn}</h1>
      <img src={`/${loc.state.profilePic}`}></img>
    </div>
  );
}

export default Home;
