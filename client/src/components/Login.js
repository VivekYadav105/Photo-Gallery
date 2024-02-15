import "./style.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../App";

function Login() {
  const [userState, setUserState] = useState();
  const { user, login } = useContext(UserContext);

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setUserState({ email: email, password: password });
  }

  function setDemoCredentials(){
    emailRef.current.value = process.env.REACT_APP_DEMO_EMAIL
    passwordRef.current.value = process.env.REACT_APP_DEMO_PASS
  }

  async function postLoginData() {
    toast.info("Login initiated");
    const origin = process.env.REACT_APP_BACKEND || "http://localhost:7000"
    const post = await fetch(`${origin}/user/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userState),
    });
    try {
      const response = await post.json();
      if (response.status == 401) {
        toast.warn("enter correct password");
      }
      if (response.status == 404) {
        toast.error("user doesn't exist please sign in here");
      }

      if (response.status == 200) {
        console.log(response.user);
        toast.success("user login succesful");

        setTimeout(() => {
          const loginResult = login(response.user);
          if (loginResult) {
            window.location.href = "/";
          }
        }, 2000);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("unable to login");
    }
  }

  useEffect(() => {
    if (userState) postLoginData();
  }, [userState]);

  return (
    <section className="loginWrapper">
      <ToastContainer
        position="top-center"
        autoClose={25000}
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
          <button className="header-btn-2" type="button" onClick={()=>{setDemoCredentials()}}>
            Use demo credentials
          </button>
        </div>
      </div>
      <div className="right">
        <div className="form-wrapper">
          <div className="text-highlight">
            <span className="text-main">Photo Gallery</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="Email"
                id="address"
                ref={emailRef}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="input-field">
              <input
                type="Password"
                id="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </div>
            <div className="input-field">
              <button type="submit">Login</button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Signup
              </button>
            </div>
            <div className="input-field">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/forgotPassword";
                }}
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
