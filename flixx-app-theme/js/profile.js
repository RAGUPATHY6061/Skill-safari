import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


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
const database = getDatabase();
const auth = getAuth(app);

const storedUserId = localStorage.getItem('userId');
const userId = storedUserId;

const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profileGender = document.getElementById("profile-gender");
const editBtn = document.getElementById('edit-btn');
const saveBtn = document.getElementById('save-btn');
const editContainer = document.getElementById('edit-container');

editBtn.addEventListener('click', () => {
    editContainer.style.display = 'block';
    document.getElementById('profile-container').style.display = 'none';
    document.getElementById('edit-name').value = profileName.textContent;
    document.getElementById('edit-email').value = profileEmail.textContent;
    document.getElementById('edit-gender').value = profileGender.textContent;
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
});

saveBtn.addEventListener('click', () => {
    const newName = document.getElementById('edit-name').value;
    const newEmail = document.getElementById('edit-email').value;
    const newGender = document.getElementById('edit-gender').value;
    profileName.textContent = newName;
    profileEmail.textContent = newEmail;
    profileGender.textContent = newGender;

    set(ref(database, 'users/' + userId), {
        username: newName,
        email: newEmail,
        gender: newGender
    });

    const user = auth.currentUser;
    updateProfile(user, {
        displayName: newName,
        email: newEmail,
        gender: newGender,
    }).then(() => {
        console.log("User profile updated successfully.");
    }).catch((error) => {
        console.log("Error updating user profile:", error);
    });

    editContainer.style.display = 'none';
    document.getElementById('profile-container').style.display = 'block';
    saveBtn.style.display = 'none';
    editBtn.style.display = 'block';
});

const profileRef = ref(database, 'users/' + userId);
onValue(profileRef, (snapshot) => {
    const profileData = snapshot.val();
    if (profileData) {
        profileName.textContent = profileData.username;
        profileEmail.textContent = profileData.email;
        profileGender.textContent = profileData.gender;
    } else {
        console.log("No data available for this user.");
    }
});