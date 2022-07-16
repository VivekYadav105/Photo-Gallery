import { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [user, setUser] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    const fname = e.target[0].value;
    const lname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const cnfrmpassword = e.target[4].value;
    const branch = e.target[5].value;
    const date = e.target[6].value;
    console.log(e);
    if (cnfrmpassword === password) {
      setUser({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        DoB: date,
        branch: branch,
      });
      toast.info("intitated signup\nplease wait for confirmation email");
    } else {
      toast.error("password doesn't match");
    }
  }

  const postSignupData = useCallback(async()=> {
    console.log("callback initiated");
    const post = await fetch(`/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    try {
      const response = await post.json();
      if ((await response.status) == 200) {
        toast.success(response.msg);
        localStorage.setItem(
          process.env.REACT_APP_USER_SESSION_SIGNUP,
          response.token
        );
      } else {
        toast.warn(response.msg);
      }
    } catch (err) {
      toast.error("error!please try again");
    }
  })

  useEffect(() => {
    if (user) postSignupData();
  }, [user]);

  return (
    <section className="signupWrapper">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="left">
        <div className="text-wrapper">
          <h1>Learn to code by watching others</h1>
          <p>
            See how experienced developers solve problems in real-time. Watching
            scripted tutorials is great, but understanding how developers think
            is invaluable.
          </p>
        </div>
      </div>
      <div className="right">
        <div className="form-wrapper">
          <div className="text-highlight">Node user authentication project</div>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input type="text" id="fname" placeholder="First Name" required />
              <input type="text" id="lname" placeholder="Last Name" required />
            </div>
            <div className="input-field">
              <input
                type="Email"
                id="address"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="input-field">
              <input
                type="Password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="input-field">
              <input
                type="Password"
                id="cnfrmpassword"
                placeholder="confirm Password"
                required
              />
            </div>
            <div className="input-field">
              <span className="flex-column">
                <label htmlFor="branch">branch</label>
                <select className="" id="branch">
                  <option value={"CSE"}>CSE</option>
                  <option value={"ECE"}>ECE</option>
                  <option value={"DSAI"}>DSAI</option>
                </select>
              </span>
              <span className="flex-column">
                <label id="date">DoB</label>
                <input type="date" />
              </span>
            </div>
            <div className="input-field">
              <button type="submit">Signup</button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
