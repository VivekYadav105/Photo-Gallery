import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState();
  const Params = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    const newpassword = e.target[0].value;
    const confirmPassword = e.target[1].value;

    if (newpassword === confirmPassword) {
      setPassword(newpassword);
    } else {
      toast.error("passwords doesn't match");
    }
  }

  useEffect(() => {
    if (password) {
      postResetData();
    }
  }, [password]);

  const postResetData = useCallback(async () => {
    const post = await axios.post(`${process.env.REACT_APP_BACKEND}/resetPassword`, {
      userid: Params.userid,
      token: Params.token,
      password: password,
    });

    console.log(post);

    if (post.status == 200) {
      toast.success(post.msg);
      window.location.href = "/login";
    } else {
      toast.error(post.msg);
    }
  });

  return (
    <section
      className="loginWrapper"
      style={{ display: "flex", justifyContent: "center" }}
    >
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
      <div
        className="right"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="form-wrapper">
          <div className="text-highlight">Node user authentication project</div>
          <form onSubmit={handleSubmit}>
            <h1
              className=""
              style={{
                color: "#6055a5",
                fontSize: "24px",
                textAlign: "center",
                margin: "0",
              }}
            >
              Reset Password
            </h1>
            <div className="input-field">
              <input
                type="password"
                id="password"
                placeholder="password"
                required
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm password"
                required
              />
            </div>
            <div className="input-field">
              <button type="submit">submit</button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                back
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
