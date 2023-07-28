import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function EditProfile() {
  let loc = useLocation();
  console.log("inside edit profile");
  console.log(loc.state);

  let [profilePic, setProfilePic] = useState("./images/profilePic.jpeg");
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let ageInputRef = useRef();
  let profilePicInputRef = useRef();
  let contactNoInputRef = useRef();

  useEffect(() => {
    firstNameInputRef.current.value = loc.state.fn;
    lastNameInputRef.current.value = loc.state.ln;
    emailInputRef.current.value = loc.state.email;
    // passwordInputRef.current.value = loc.state.fn;
    ageInputRef.current.value = loc.state.age;
    setProfilePic(`http://localhost:3333/${loc.state.profilePic}`);
    contactNoInputRef.current.value = loc.state.contactNo;
  }, []);

  let updateProfile = async () => {
    let dataToSend = new FormData();
    dataToSend.append("fn", firstNameInputRef.current.value);
    dataToSend.append("ln", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("contactNo", contactNoInputRef.current.value);
    dataToSend.append("id", loc.state._id);
    // dataToSend.append("profilePic", profilePicInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "PUT",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/editProfile", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Edit Profile</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>

        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>

        <div>
          <label>Contact No.</label>
          <input ref={contactNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            ref={profilePicInputRef}
            onChange={() => {
              let selectedFileURL = URL.createObjectURL(
                profilePicInputRef.current.files[0]
              );

              setProfilePic(selectedFileURL);

              console.log(profilePicInputRef.current.files);
            }}
          ></input>
        </div>
        <br></br>
        <img src={profilePic} className="profilePreview"></img>
        <div>
          <button
            type="button"
            onClick={() => {
              updateProfile();
            }}
          >
            Update Profile
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default EditProfile;
