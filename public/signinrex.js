
function getValues()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var data = {
        email: email,
        password: password
    }
    return data;
}

function signinregex()
{
    var data = getValues();
    event.preventDefault();
    var email = data.email;
    var password = data.password;
    var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(email == "" || password == "")
    {

        document.getElementById("email").style.borderColor = "red";
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("email").placeholder = "Email is required";
        document.getElementById("password").placeholder = "Password is required";
        return false;
    }
    else if(!email.match(emailregex))
    {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("email").value = "";
        document.getElementById("email").placeholder = "Invalid email";
        document.getElementById("emailholder").textContent = "Email must be in the format: abc@domain.com";
        return false;
    }
    else if(!password.match(passwordregex))
    {
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("password").value = "";
        document.getElementById("password").placeholder = "Invalid password";
        document.getElementById("passholder").textContent="Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters";
        return false;
    }
    
}
