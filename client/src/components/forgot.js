import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const emailId = e.target[0].value;
    setEmail({ email: e.target[0].value });
  }

  useEffect(() => {
    console.log(email);
    if(email) postForgotPasswordData();
  }, [email]);

  const postForgotPasswordData = useCallback(async () => {
    const post = await fetch(`/forgotpassword`, {
      method: "POST",
      mode: "cors",
      headers: { "content-type": "application/json",Authorization:`Bearer ${sessionStorage.getItem('user')}` },
      body: JSON.stringify(email),
    });
    const response = await post.json();
    console.log(response);
    if (response.status == 200) {
      toast.info(
        "a conformation link is sent to the user email to change the password"
      );
    } else {
      toast.error(response.msg);
    }
  });

  return (
    <section className="loginWrapper" style={{display:'flex',justifyContent:'center'}}>
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
      <div className="right" style={{display:'flex',justifyContent:'center'}}>
        <div className="form-wrapper">
          <div className="text-highlight">Node user authentication project</div>
          <form onSubmit={handleSubmit}>
            <h1 className="" style={{color:'#6055a5',fontSize:'24px',textAlign:'center',margin:'0'}}>ForgotPassword</h1>
            <div className="input-field">
              <input
                type="Email"
                id="address"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="input-field">
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
