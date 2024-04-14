function getValues()
{

    var name=document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;
    var data = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phone:phone,
        address:address,
        city:city,
        country:country

    }
    clearErrors();
    return data;
}

function clearErrors()
{
    document.getElementById("name").style.borderColor = "";
    document.getElementById("email").style.borderColor = "";
    document.getElementById("password").style.borderColor = "";
    document.getElementById("confirmPassword").style.borderColor = "";
    document.getElementById("phone").style.borderColor = "";
    document.getElementById("address").style.borderColor = "";
    document.getElementById("city").style.borderColor = "";
    document.getElementById("country").style.borderColor = "";
    document.getElementById("nameholder").textContent = "";
    document.getElementById("emailholder").textContent = "";
    document.getElementById("passholder").textContent = "";
    document.getElementById("phoneholder").textContent = "";
}



function signupregex()
{
    var data = getValues();
    event.preventDefault();
    var name = data.name;
    var email = data.email;
    var password = data.password;
    var confirmPassword = data.confirmPassword;
    var phone=data.phone;
    var address=data.address;
    var city=data.city;
    var country=data.country;

    var nameregex = /^[a-zA-Z ]+$/;
    var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var phoneregex = /^\d{10}$/;
    if(name == "" || email == "" || password == "" || confirmPassword =="" ||  phone=="" || address=="" || city=="" || country=="")
    {
        if(name == "" && email == "" && password == "" && confirmPassword =="" &&  phone=="" && address=="" && city=="" && country=="")
        {
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("confirmPassword").style.borderColor = "red";
            document.getElementById("phone").style.borderColor = "red";
            document.getElementById("address").style.borderColor = "red";
            document.getElementById("city").style.borderColor = "red";
            document.getElementById("country").style.borderColor = "red";
            document.getElementById("name").placeholder = "Name is required";
            document.getElementById("email").placeholder = "Email is required";
            document.getElementById("password").placeholder = "Password is required";
            document.getElementById("confirmPassword").placeholder = "Confirm Password is required";
            document.getElementById("phone").placeholder = "Phone is required";
            document.getElementById("address").placeholder = "Address is required";
            document.getElementById("city").placeholder = "City is required";
            document.getElementById("country").placeholder = "Country is required";
            return false;
        }
        if(name == "")
        {
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("name").value = "";
            document.getElementById("name").placeholder = "Name is required";
       
        }
        if(email == "")
        {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("email").value = "";
            document.getElementById("email").placeholder = "Email is required";


        }
        if(password == "")
        {
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password").value = "";
            document.getElementById("password").placeholder = "Password is required";


        }
        if(confirmPassword == "")
        {
            document.getElementById("confirmPassword").style.borderColor = "red";
            document.getElementById("confirmPassword").value = "";
            document.getElementById("confirmPassword").placeholder = "Confirm Password is required";

          
        }
        if(phone == "")
        {
            document.getElementById("phone").style.borderColor = "red";
            document.getElementById("phone").value = "";
            document.getElementById("phone").placeholder = "Phone is required";


        }
        if(address == "")
        {
            document.getElementById("address").style.borderColor = "red";
            document.getElementById("address").value = "";
            document.getElementById("address").placeholder = "Address is required";
    
        }
        if(city == "")
        {
            document.getElementById("city").style.borderColor = "red";
            document.getElementById("city").value = "";
            document.getElementById("city").placeholder = "City is required";

        }
        if(country == "")
        {
            document.getElementById("country").style.borderColor = "red";
            document.getElementById("country").value = "";
            document.getElementById("country").placeholder = "Country is required";

        
        }

        return false;
        
    }
    else if(!name.match(nameregex))
    {
        document.getElementById("name").style.borderColor = "red";
        document.getElementById("name").value = "";
        document.getElementById("name").placeholder = "Invalid name";
        document.getElementById("nameholder").textContent = "Name must contain only alphabets";
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
    else if(password != confirmPassword)
        {
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("confirmPassword").style.borderColor = "red";
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";
            document.getElementById("password").placeholder = "Password does not match";
            document.getElementById("confirmPassword").placeholder = "Password does not match";
            return false;
        }
    else if(!phone.match(phoneregex))
    {
        document.getElementById("phone").style.borderColor = "red";
        document.getElementById("phone").value = "";
        document.getElementById("phone").placeholder = "Invalid phone number";
        document.getElementById("phoneholder").textContent="Phone number must contain 10 digits";
        return false;
    }
    else
    {
        
        document.getElementById("name").style.borderColor = "green";
        document.getElementById("email").style.borderColor = "green";
        document.getElementById("password").style.borderColor = "green";
        document.getElementById("confirmPassword").style.borderColor = "green";
        document.getElementById("phone").style.borderColor = "green";
        document.getElementById("address").style.borderColor = "green";
        document.getElementById("city").style.borderColor = "green";
        document.getElementById("country").style.borderColor = "green";
        return true;
    }

}