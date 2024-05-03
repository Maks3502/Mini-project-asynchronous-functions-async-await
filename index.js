window.onload = function() {
    const createUserButton = document.getElementById('createUserButton');
    createUserButton.addEventListener('click', createUser);
    
    fetchUsers();
};

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function createUser() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
                name: 'John Doe',
                email: 'john@example.com',
                phone: '123-456-7890',
                website: 'https://example.com'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response.ok) {
            const newUser = await response.json();
            console.log('New user created:', newUser);
            
            
            renderUser(newUser);
        } else {
            console.error('Error creating user:', response.statusText);
            console.error('Response status:', response.status);
            console.error('Response body:', await response.text());
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
}


async function updateUser(userId, newData) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if(response.ok) {
            const updatedUser = await response.json();
            console.log('User updated:', updatedUser);
           
            fetchUsers();
        } else {
            console.error('Error updating user:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('User deleted:', userId);
            
            const userElement = document.getElementById(`user-${userId}`);
            if (userElement) {
                userElement.remove();
            }
        } else {
            console.error('Error deleting user:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

function renderUsers(users) {
    const output = document.getElementById('output');
    output.innerHTML = '';
    users.forEach(user => renderUser(user));
}

function renderUser(user) {
    const output = document.getElementById('output');
    const div = document.createElement('div');
    div.classList.add('user');
    div.setAttribute('id', `user-${user.id}`);
    div.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Website: ${user.website}</p>
        <button class="update-button">Update</button>
        <button class="delete-button">Delete</button>
        <hr>
    `;
    output.appendChild(div);

    
    const updateButton = div.querySelector('.update-button');
    updateButton.addEventListener('click', () => updateUser(user.id, { name: 'Updated Name' }));

    const deleteButton = div.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteUser(user.id));
}
