var encodedString;
var state = "Home";
var captcha;
const auth = firebase.auth();


function signup(){
    state = "Signed up";
    var useremail = document.getElementById("email_field").value;
    var userpsw = document.getElementById("password_field").value;

    const promise=auth.createUserWithEmailAndPassword(useremail, userpsw).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === "auth/email-already-in-use"){
            alert('The email is already used');
        }
        else if(errorCode === "auth/invalid-email"){
            alert('The email address is not valid');
        }
        else{
            alert('The password is too weak');
        }
    })
}

function encrypt(){
    var webvalue= document.getElementById("web").value;
    // alert(webvalue);
    var pass1value= document.getElementById("pass1").value;
    // alert(pass1value);
    var pass2value= document.getElementById("pass2").value;
    var pass1cvalue= document.getElementById("pass1c").value;
    var pass2cvalue= document.getElementById("pass2c").value;
    if(pass1value==pass1cvalue&&pass2value==pass2cvalue)
    {
        var sum = webvalue+pass1value+pass2value;
        // var baseString = document.querySelectorAll('#web','#pass1','#pass2').value;
        encodedString = window.btoa(sum);
        document.getElementById("encrypted").value = encodedString;
        window.preventDefault();
    }
    else{
        alert("Passwords don't match !");
    }   

    
}



function login(){
     if (document.getElementById("key").innerHTML == "Matched"){

    
        state = "Logged in";    
        var useremail = document.getElementById("email_field").value;
        var userpsw = document.getElementById("password_field").value;
        firebase.auth().signInWithEmailAndPassword(useremail, userpsw).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode === "auth/invalid-email"){
                alert('The email address is invalid');
                state = "Home";
            }
            else if(errorCode === "auth/user-not-found"){
                alert('The user is not found');
                state = "Home";
            }
            else if(errorCode === "auth/wrong-password"){
                alert('The password is not correct');
                state ="Home";
            }
            else{redirect();}
            // alert(state);
        });
    }
    else{
        alert("Captcha not correct");
    }
}

function logout(){
    state ="Logged out";
    firebase.auth().signOut();
}
function redirect(){
    window.location = "home.html";
}


firebase.auth().onAuthStateChanged(function(user) {
    if (state === "Home") {

      document.getElementById("user-div").style.display = "none";
      document.getElementById("login-div").style.display = "block";
      document.getElementById("s-div").style.display = "none";
  
    } 
    else if(state === "Signed up") {
      // No user is signed in.
      document.getElementById("user-div").style.display = "none";
      document.getElementById("login-div").style.display = "block";
      alert("Sign up successfully!");
      redirect();
  
    }
    else if(state === "Logged in"){
        document.getElementById("user-div").style.display = "block";
        document.getElementById("login-div").style.display = "none";
        document.getElementById("s-div").style.display = "none";
        alert(state);
        redirect();
    }
    else{
        document.getElementById("user-div").style.display = "none";
        document.getElementById("login-div").style.display = "block";
        document.getElementById("s-div").style.display = "none";
        state = "Home";
    }
  })

  //CAPTCHA PART STARTS HERE
function generate() {

	// Clear old input
	document.getElementById("submit").value = "";


	// Access the element to store
	// the generated captcha
	captcha = document.getElementById("image");
	var uniquechar = "";

	const randomchar =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	// Generate captcha for length of
	// 5 with random character
	for (let i = 1; i < 5; i++) {
		uniquechar += randomchar.charAt(
			Math.random() * randomchar.length)
	}

	// Store generated input
	captcha.innerHTML = uniquechar;
}

function printmsg() {
	const usr_input = document
		.getElementById("submit").value;

	// Check whether the input is equal
	// to generated captcha or not
	if (usr_input == captcha.innerHTML) {
		document.getElementById("key").innerHTML = "Matched";
		generate();
	}
	else {
		document.getElementById("key").innerHTML = "not Matched";
		generate();
	}
};
