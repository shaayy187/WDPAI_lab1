// requests_async.js

// Function to send GET request
window.addEventListener('load', function() {
    fetch("http://localhost:8000/") 
        .then(response => response.json())
        .then(data => {
            updateTable(data.users);  
        })
        .catch(error => console.error('Error:', error));
});

// Function to send POST request
async function sendPostRequest() {
    const username = document.getElementById("inbox1").value; 
    const lastname = document.getElementById("inbox2").value;
    const role = document.getElementById("Roles").value;
    const privacyPolicyChecked = document.getElementById("privacyPolicy").checked;
    
    if (!privacyPolicyChecked) {
        alert("You must agree to the privacy policy to proceed.");
        return; 
    }
    if (username=='') {
        alert("You must provide Name!.");
        return; 
    }
    if (lastname=='') {
        alert("You must provide Lastname!.");
        return; 
    }
    if (role=='') {
        alert("You must provide Role!.");
        return; 
    }
    const data = { name: username, surname: lastname, role: role };
    try {
        const response = await fetch("http://localhost:8000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        updateTable(responseData.users);
    } catch (error) {
        console.error('Error:', error);
    }
}


function updateTable(users) {
    const usersList = document.getElementById("usersList");


    usersList.innerHTML = '';


    users.forEach((user, index) => {
        
        const userItem = document.createElement("div");
        userItem.classList.add("user-item");

        
        const userInfo = document.createElement("div");
        
        const userName = document.createElement("span");
        userName.textContent = `${user.name} ${user.surname}`;
        userInfo.appendChild(userName);

        const userRole = document.createElement("small");
        userRole.textContent = user.role;
        userInfo.appendChild(userRole);

        userItem.appendChild(userInfo);
        
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        deleteButton.onclick = () => deleteUser(user.index);

        
        userItem.appendChild(deleteButton);
        usersList.appendChild(userItem);
    });
}

async function deleteUser(index) {
    try {
        const response = await fetch(`http://localhost:8000/?index=${index.toString()}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseData = await response.json();
        updateTable(responseData.users); 
    } catch (error) {
        console.error('Error:', error);
    }
}
