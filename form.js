// Name and Password from the register-form
// storing input from register-form
function store() {
    // Password from the register - form
    var new_key  = document.getElementById('pw').value;
    //if localstorage is empty,save an empty array
    if (localStorage.getItem('key') == null) {
        localStorage.setItem('key', '[]')
    }
    //add new data to the old data
    var old_key = JSON.parse(localStorage.getItem('key')); 
     old_key.push(new_key);
    //save data to local storage
    localStorage.setItem('key', JSON.stringify(old_key));
    
    var new_name = document.getElementById('name1').value;
    //if localstorage is empty,save an empty array
    if (localStorage.getItem('name') == null) {
        localStorage.setItem('name', '[]')
    }
    //add new data to the old data
    var old_name = JSON.parse(localStorage.getItem('name'));
    old_name.push(new_name);
    //save data to local storage
    localStorage.setItem('name', JSON.stringify(old_name));
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
    if (userName.value == storedName.value && userPw.value == storedPw.value)
    {
        alert('You are loged in.');
    } else {
        alert('ERROR.');
    }
}