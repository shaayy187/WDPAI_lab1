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
    const table = document.getElementById("usersList"); 
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    users.forEach((user, index) => {
        const newRow = table.insertRow(-1); 
        const cell1 = newRow.insertCell(0); 
        const cell2 = newRow.insertCell(1); 
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3); 

        cell1.textContent = user.name; 
        cell2.textContent = user.surname; 
        cell3.textContent = user.role;  

        const btn = document.createElement("button");
        btn.innerHTML = "🗑️"; 
        btn.onclick = () => {
            deleteUser(index); 
        };
        cell4.appendChild(btn); 
       
    });
}


async function deleteUser(index) {
    try {
        const response = await fetch(`http://localhost:8000/?index=${index}`, {
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
