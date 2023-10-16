 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
 import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
 
 const signupBtn = document.getElementById("signup-btn");
 const nameField = document.getElementById("name");
 const signupEmail = document.getElementById("signup-email");
 const signupPassword = document.getElementById("signup-password");
 const confirmPassword = document.getElementById("confirm-password");
 const genderField = document.getElementById("gender");
 
 const auth = getAuth();
 const database = getDatabase();
 
 signupBtn.addEventListener("click", () => {
  const name = nameField.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  const confirm = confirmPassword.value;
  const gender = genderField.value;

  if (password !== confirm) {
      alert("Passwords do not match");
      return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up: " + user.uid);
        localStorage.setItem('userId', user.uid); // Store the user ID in local storage
        return saveUserData(user.uid, name, email, gender);
    })
    .then(() => {
        window.location.href = "index.html";
        clearFields();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorCode + " - " + errorMessage);
        clearFields();
    });
});

function saveUserData(userId, name, email, gender) {
  return set(ref(database, 'users/' + userId), {
      username: name,
      email: email,
      gender: gender
  });
}

 function clearFields() {
     nameField.value = '';
     signupEmail.value = '';
     signupPassword.value = '';
     confirmPassword.value = '';
     genderField.value = 'Male'; 
 }

 

