import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  let [profilePic, setProfilePic] = useState("./images/profilePic.jpeg");
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let ageInputRef = useRef();
  let profilePicInputRef = useRef();
  let contactNoInputRef = useRef();

  let sendSignUptoSever = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let dataToSend = {
      fn: firstNameInputRef.current.value,
      ln: lastNameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      age: ageInputRef.current.value,
      contactNo: contactNoInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };

    let reqOptions = {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: myHeader,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let sendSignUptoServerURLE = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let dataToSend = new URLSearchParams();
    dataToSend.append("fn", firstNameInputRef.current.value);
    dataToSend.append("ln", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("contactNo", contactNoInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
      headers: myHeader,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let sendSignUptoServerFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("fn", firstNameInputRef.current.value);
    dataToSend.append("ln", lastNameInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("contactNo", contactNoInputRef.current.value);
    // dataToSend.append("profilePic", profilePicInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    alert("Done");
    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Sign Up</h2>
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
              sendSignUptoSever();
            }}
          >
            Sign Up (JSON)
          </button>
          <button
            type="button"
            onClick={() => {
              sendSignUptoServerURLE();
            }}
          >
            Sign Up(URLEncoded)
          </button>
          <button
            type="button"
            onClick={() => {
              sendSignUptoServerFD();
            }}
          >
            Sign Up(FormData)
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default SignUp;
