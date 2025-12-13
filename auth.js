// SIMPLE auth.js that will definitely work
console.log('Simple auth.js loaded');

// Make showAuthModal available globally
window.showAuthModal = function() {
    console.log('Showing login modal');
    
    // Remove any existing modal
    const oldModal = document.querySelector('.login-modal');
    if (oldModal) oldModal.remove();
    
    // Create modal HTML
    const modalHTML = `
    <div class="login-modal" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    ">
        <div style="
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            position: relative;
        ">
            <button onclick="this.closest('.login-modal').remove()" style="
                position: absolute;
                right: 15px;
                top: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            ">×</button>
            
            <h2 style="margin-bottom: 20px; color: #ff6b6b;">Нэвтрэх / Бүртгүүлэх</h2>
            
            <div style="margin-bottom: 20px;">
                <input type="text" id="loginInput" placeholder="Имэйл эсвэл нэр" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="password" id="passwordInput" placeholder="Нууц үг" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <button onclick="login()" style="
                    width: 100%;
                    padding: 12px;
                    background: #ff6b6b;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">Нэвтрэх</button>
                <p style="text-align: center; margin-top: 10px;">
                    <a href="#" onclick="showSignup()" style="color: #ff6b6b; text-decoration: none;">
                        Шинэ хэрэглэгч үү? Бүртгүүлэх
                    </a>
                </p>
            </div>
            
            <div id="signupSection" style="display: none;">
                <input type="text" id="signupName" placeholder="Бүтэн нэр" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="text" id="signupUsername" placeholder="Хэрэглэгчийн нэр" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="email" id="signupEmail" placeholder="Имэйл" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="password" id="signupPassword" placeholder="Нууц үг" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="password" id="signupPassword2" placeholder="Нууц үг давтах" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <button onclick="signup()" style="
                    width: 100%;
                    padding: 12px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">Бүртгүүлэх</button>
                <p style="text-align: center; margin-top: 10px;">
                    <a href="#" onclick="showLogin()" style="color: #ff6b6b; text-decoration: none;">
                        Аль хэдийн бүртгүүлсэн үү? Нэвтрэх
                    </a>
                </p>
            </div>
            
            <p id="errorMsg" style="color: red; text-align: center; margin-top: 10px;"></p>
        </div>
    </div>`;
    
    // Add to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// Login function
window.login = function() {
    const username = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;
    
    if (!username || !password) {
        document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
        return;
    }
    
    // Save user info
    const user = {
        username: username,
        email: username.includes('@') ? username : username + '@example.com',
        name: username,
        loggedIn: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update UI
    updateUserDisplay(user);
    
    // Close modal
    document.querySelector('.login-modal').remove();
    
    // Show success
    alert('Амжилттай нэвтэрлээ!');
};

// Signup function
window.signup = function() {
    const name = document.getElementById('signupName').value;
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const password2 = document.getElementById('signupPassword2').value;
    
    // Validation
    if (!name || !username || !email || !password || !password2) {
        document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
        return;
    }
    
    if (password !== password2) {
        document.getElementById('errorMsg').textContent = 'Нууц үг таарахгүй байна!';
        return;
    }
    
    // Save user
    const user = {
        username: username,
        email: email,
        name: name,
        loggedIn: true
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update UI
    updateUserDisplay(user);
    
    // Close modal
    document.querySelector('.login-modal').remove();
    
    // Show success
    alert('Амжилттай бүртгүүллээ!');
};

// Show signup form
window.showSignup = function() {
    document.querySelector('#signupSection').style.display = 'block';
    document.querySelector('#signupSection').previousElementSibling.style.display = 'none';
};

// Show login form
window.showLogin = function() {
    document.querySelector('#signupSection').style.display = 'none';
    document.querySelector('#signupSection').previousElementSibling.style.display = 'block';
};

// Update user display in nav
function updateUserDisplay(user) {
    // Find user button
    let userBtn = document.getElementById('userAuthButton');
    if (!userBtn) {
        const userImg = document.querySelector('img[src*="userButton"]');
        if (userImg) userBtn = userImg.parentElement;
    }
    
    if (userBtn) {
        // Update button to show username
        userBtn.innerHTML = `
            <img src="./img/userButton.svg" style="vertical-align: middle;">
            <span style="font-size: 12px; margin-left: 5px; color: #555;">${user.username}</span>
        `;
        
        // Add logout button
        const logoutBtn = document.createElement('button');
        logoutBtn.innerHTML = '🚪';
        logoutBtn.title = 'Гарах';
        logoutBtn.style.cssText = `
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            margin-left: 10px;
        `;
        logoutBtn.onclick = function() {
            localStorage.removeItem('currentUser');
            alert('Амжилттай гарлаа!');
            location.reload();
        };
        
        // Add logout button next to user button
        userBtn.parentElement.appendChild(logoutBtn);
    }
}

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            updateUserDisplay(user);
        } catch (e) {
            console.error('Error loading user:', e);
        }
    }
    
    // Setup user button click
    setTimeout(function() {
        let userBtn = document.getElementById('userAuthButton');
        if (!userBtn) {
            const userImg = document.querySelector('img[src*="userButton"]');
            if (userImg) userBtn = userImg.parentElement;
        }
        
        if (userBtn) {
            userBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthModal();
            });
            console.log('User button click handler added');
        }
    }, 1000);
});

console.log('Auth system ready - click user button to login!');