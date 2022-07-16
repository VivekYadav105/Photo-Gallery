import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function Verify() {
  async function addUser() {
    const userToken = localStorage.getItem("Tempuser");
    const post = await fetch(`/api/verify`, {
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorizaton: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ userToken: userToken }),
    });
    const response = await post.json();
    if (response.status == 201) {
      window.location.href = "/login";
      localStorage.removeItem("Tempuser");
    } else {
      toast.warn(response.msg);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }

  useEffect(() => {
    addUser();
  });

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
          <h1>Please wait while verfying the user</h1>
        </div>
      </div>
    </section>
  );
}

export default Verify;
