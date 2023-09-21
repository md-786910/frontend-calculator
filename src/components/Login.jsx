import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const loginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("access_token", JSON.stringify(user));
        if (token) {
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        alert(error?.message);
      });
  };

  return (
    <div className="centerBtn">
      <link
        rel="stylesheet"
        type="text/css"
        href="//fonts.googleapis.com/css?family=Open+Sans"
      />

      <div class="google-btn">
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text" onClick={loginGoogle}>
          <b>Sign in with google</b>
        </p>
      </div>
    </div>
  );
}

export default Login;
