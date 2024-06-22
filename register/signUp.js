import { auth, createUserWithEmailAndPassword, database, ref, set } from "../firebaseConfig.js"

// ///////////////////
const signUpForm = document.getElementById("signUpForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("email");
const userPass = document.getElementById("userPass");
const erorrMsg = document.querySelector(".erorr");

signUpForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const validation = validateForm(userName.value,userEmail.value,userPass.value);
    
    if(validation){
        console.log("valid")

// ////////////////////////////////

// ////////////////////////////////

       createUserWithEmailAndPassword(auth, userEmail.value, userPass.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const role = userEmail.value.includes('@admin.com') ? 'admin' : 'user'; // Simple check for admin
            const db = database;
             set(ref(db, 'users/' + user.uid), {
              username: userName.value,
              email: userEmail.value,
              role: role
            }).then(()=>{
                alert("added");
                e.target.submit();
            });

            if(!sessionStorage.getItem("user-info")){
                sessionStorage.setItem("user-info",JSON.stringify({
                userName:userName.value,
                role:role,
                email: userEmail.value,
                id:user.uid
                }));
            }

        }).catch((error) => {
            console.log("here")
            erorrMsg.innerText = error.message;
            erorrMsg.style.display = "block"
        })
        }else{
            console.log("can not signup");
            return;
        }
});



function validateForm(name,email,pass){
    let nameRegex = new RegExp(/^[a-zA-Z]{3,}$/)
    let emailRegex = new RegExp(/^[a-zA-Z0-9]{2,}@[a-z]{2,}(.)(com|net|org|edu)$/);
    let passRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}/);

    if(!nameRegex.test(name)){
        erorrMsg.innerText = "Your Name Should be at least 3 characters";
        erorrMsg.style.display = "block"
        return false;
    } else if(!emailRegex.test(email)){
        erorrMsg.innerText = "Your Email Should be at this Format: abc@efg.(com | net | org | edu)";
        erorrMsg.style.display = "block"
        return false;
    } else if(!passRegex.test(pass)){
        erorrMsg.innerText = "Your Password Should be at lest 8 characters and contain (a-z, A-Z, 0-9, (!@#$%^&*))";
        erorrMsg.style.display = "block"
        return false;
    } else {
        return true;
    }
}

function hideErr(){
    erorrMsg.style.display = "none";
  }

// once user go to change inputs hide the erorr
  userName.addEventListener("keydown",hideErr)
  userEmail.addEventListener("keydown",hideErr)
  userPass.addEventListener("keydown",hideErr)




