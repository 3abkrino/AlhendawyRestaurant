// Name and Password from the register-form
// storing input from register-form
function store() {
    // Password from the register - form
    var new_email = document.getElementById('email').value;
    var new_name = document.getElementById('name1').value;
    var new_key = document.getElementById('pw').value;
    //if localstorage is empty,save an empty array
    if (localStorage.getItem('key') == null) {
        localStorage.setItem('key', '[]')
    }
    //add new data to the old data
    var old_key = JSON.parse(localStorage.getItem('key'));


    //if localstorage is empty,save an empty array
    if (localStorage.getItem('name') == null) {
        localStorage.setItem('name', '[]')
    }
    //add new data to the old data
    var old_name = JSON.parse(localStorage.getItem('name'));


    //if localstorage is empty,save an empty array
    if (localStorage.getItem('email') == null) {
        localStorage.setItem('email', '[]')
    }
    //add new data to the old data
    var old_email = JSON.parse(localStorage.getItem('email'));


    // check for duplication
    if (old_name != null) {
        if (old_name != '[]') {
            if (old_name.includes(new_name)) {
                alert("user exist,please change username");  
                return;
            }
        }
    }
    old_key.push(new_key);
    //save data to local storage
    localStorage.setItem('key', JSON.stringify(old_key));

    old_name.push(new_name);
    //save data to local storage
    localStorage.setItem('name', JSON.stringify(old_name));

    old_email.push(new_email);
    //save data to local storage
    localStorage.setItem('email', JSON.stringify(old_email));
    
    window.location.replace("./login.html");
    return false ;
    
}


// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedPw = JSON.parse(localStorage.getItem('key'));

    var storedName = JSON.parse(localStorage.getItem('name'));
    // entered data from the login-form
    var userPw = document.getElementById('userPw');
    var userName = document.getElementById('userName');
    // check if stored data from register-form is equal to data from login form
    // if (storedPw.include(userPw,0) && storedName.include(userName,0))
    for (let index = 0; index < storedName.length; index++) {
        if (userName.value == storedName[index] && userPw.value == storedPw[index]) {
            localStorage.setItem('loggedUser', storedName[index]);
            alert('You are loged in.');
            window.location.replace("./gallery.html");
            return false;
        }
    }

    localStorage.setItem('loggedUser', null);
    alert('ERROR.');

}
function Register(){
    window.location.replace("./register.html");
}