import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


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
const auth = getAuth(app);
const database = getDatabase();

const signinBtn = document.getElementById("signin-btn");
const signinEmail = document.getElementById("signin-email");
const signinPassword = document.getElementById("signin-password");
signinBtn.addEventListener("click", () => {
    const email = signinEmail.value;
    const password = signinPassword.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in: " + user.uid);
        const userId = user.uid;
        const userRef = ref(database, 'users/' + userId);

        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            console.log("User data retrieved:", userData);
          } else {
            console.log("No data available for this user.");
          }
        });
        showSuccess("Signed in successfully")
        setTimeout(() =>window.location.href = "index.html" , 1000);
        signinEmail.value = '';
        signinPassword.value = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode === "auth/invalid-email"){
          showAlert("Enter the email and password");
      }
      else if(errorCode === "auth/missing-password"){
          showAlert("Enter the password");

      }
        signinEmail.value = '';
        signinPassword.value = '';
      });
});
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(() => alertEl.remove(), 3000);
}

function showSuccess(message, className = 'success') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(() => alertEl.remove(), 1000);
}


