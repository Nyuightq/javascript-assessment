var form = document.querySelector("form");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const result = validation(username, password);
    
    if(result){
        localStorage.setItem("username", username);
        self.location = 'member.html';
    }
})


var login = document.getElementById('login');
var accounts = [
    { username: "admin", password: "admin" }
];

function validation(username, password){
    const nameError = document.getElementById("nameError");
    const passError = document.getElementById("passError");
    nameError.textContent = "";
    passError.textContent = "";
    const usernameRegex = /^[A-Za-z0-9_]/g;
    const passwordRegex = /^[A-Za-z0-9_!@#$%^&*()-+=<>?]/g;

    if(username == ""){
        nameError.textContent = "username cannot be blank.";
        return false;
    }
    else if(!username.match(/[A-Za-z0-9_]/)){
        nameError.textContent = "username format is invalid";
        return false;
    }

    for(const acc of accounts) {
        if(acc.username === username){
            if(acc.password === password){
                window.alert("Login successful");
                return true;
            }
            passError.textContent = "password incorrect";
            return false;
        }
    }
    nameError.textContent = "username is not existed";

    return false;
}