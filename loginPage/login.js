import { app, auth, signInWithEmailAndPassword, database, ref, set, get, child } from "../firebaseConfig.js"


const logInForm = document.getElementById("logInForm");
const erorrMsg = document.querySelector(".erorr");
const userEmail = document.getElementById("logEmail");
const userPass = document.getElementById("logPass");



logInForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail.value, userPass.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // Get User From real Time DB and Make session storage
      get(child(ref(database), `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          if(!sessionStorage.getItem("user-info")){
            sessionStorage.setItem("user-info",JSON.stringify({
              userName:snapshot.val().username,
              email: snapshot.val().email,
              role:snapshot.val().role,
              id:user.uid
            }));
          }
          window.location.href = snapshot.val().role === "admin" ? "../admin/admin.html" : "../home.html";

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
      console.log(user)
      console.log("logged in")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      erorrMsg.style.display = "block"
    });
});

function hideErr(){
  erorrMsg.style.display = "none";
}

// once user go to change inputs hide the erorr
userEmail.addEventListener("keydown",hideErr)
userPass.addEventListener("keydown",hideErr)
