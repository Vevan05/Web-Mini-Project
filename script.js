let isLogin = true;

function toggleForm() {
    isLogin = !isLogin;
    document.getElementById('formTitle').innerText = isLogin ? "Login to Continue" : "Sign Up to Continue";
    document.getElementById('authBtn').innerText = isLogin ? "Login" : "Sign Up";
    document.getElementById('signupFields').style.display = isLogin ? "none" : "block";
    document.querySelector(".toggle").innerHTML = isLogin ? "Don't have an account? <b>Sign Up</b>" : "Already have an account? <b>Login</b>";
}

document.getElementById("authBtn").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (!email || !password) {
        message.innerText = "Please fill in all fields!";
        return;
    }

    if (isLogin) {
        let user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            message.style.color = "green";
            message.innerText = "Login successful!";
            setTimeout(() => {
                localStorage.setItem("currentUser", JSON.stringify(user)); 
                window.location.href = "dashboard.html"; 
            }, 1000);
        } else {
            message.innerText = "Invalid email or password!";
        }
    } else {
        let username = document.getElementById("signupUsername").value;
        if (!username) {
            message.innerText = "Username is required!";
            return;
        }
        if (localStorage.getItem(email)) {
            message.innerText = "User already exists!";
            return;
        }
        localStorage.setItem(email, JSON.stringify({ username, email, password }));
        message.style.color = "green";
        message.innerText = "Signup successful! Please login.";
        toggleForm();
    }
});
