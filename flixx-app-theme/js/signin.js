import { getAuth, signInWithEmailAndPassword,  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
 const firebaseConfig = {
  apiKey: "AIzaSyCcQUSfPSh9KdIjxhbt1uChdVbQo0b_52Y",
  authDomain: "movie-app-efe10.firebaseapp.com",
  databaseURL: "https://movie-app-efe10-default-rtdb.firebaseio.com",
  projectId: "movie-app-efe10",
  storageBucket: "movie-app-efe10.appspot.com",
  messagingSenderId: "781259805947",
  appId: "1:781259805947:web:b257085265cdee71c8cc5e"
};
  const app = initializeApp(firebaseConfig);
  
 const signinBtn = document.getElementById("signin-btn");
 const signinEmail = document.getElementById("signin-email");
 const signinPassword = document.getElementById("signin-password");
 
 // Initialize Firebase Authentication
 const auth = getAuth();
 
// Sign-in functionality
signinBtn.addEventListener("click", () => {
    const email = signinEmail.value;
    const password = signinPassword.value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in: " + user.uid);
        window.location.href = "index.html";
        signinEmail.value = '';
      signinPassword.value = '';  
      alert('SignedIn successfully')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorCode + " - " + errorMessage);
        signinEmail.value = '';
      signinPassword.value = '';
      });
  });