document.getElementById("login-btn").addEventListener('click',function(){
    const userName = document.getElementById("userName")
    const userPass = document.getElementById("password")
    const userNameValu = userName.value 
    const userPassValu = userPass.value
//    console.log(userNameValu,userPassValu);
   userName.value=""
   if(userNameValu === "admin" && userPassValu === "admin123"){
    alert("Login Successful")
     window.location.assign("home.html");
   }
   else{
    alert("Invalid  Name or Password")
   }
})