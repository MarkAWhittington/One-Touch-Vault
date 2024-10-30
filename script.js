document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.querySelector('input[name="username"]').value;
    const password = this.querySelector('input[name="password"]').value;
    const rememberMe = this.querySelector('input[name="rememberMe"]').checked;
    
    // Basic validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user || (username === "demo" && password === "password")) {
        // Store login info if remember me is checked
        if (rememberMe) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
        
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify({
            id: 'local_' + Math.random().toString(36).substr(2, 9),
            name: username,
            email: user ? user.email : 'demo@example.com',
            provider: 'local'
        }));
        
        // Show dashboard
        document.querySelector('.auth-container').style.display = 'none';
        document.querySelector('.dashboard-container').style.display = 'flex';
        document.querySelector('.dashboard-container').classList.add('visible');
    } else {
        alert('Invalid username or password');
    }
});

// Check for remembered login on page load
window.addEventListener('load', function() {
    const rememberedUser = localStorage.getItem('username');
    if (rememberedUser) {
        document.querySelector('input[name="username"]').value = rememberedUser;
        document.querySelector('input[name="rememberMe"]').checked = true;
    }
});

// Fix signup form display toggle
function showTab(tabName) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTab = document.querySelector('.tab:nth-child(1)');
    const signupTab = document.querySelector('.tab:nth-child(2)');
    
    if (tabName === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
    }
}

// Add signup form handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.querySelector('input[name="username"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const password = this.querySelector('input[name="password"]').value;
    const confirmPassword = this.querySelector('input[name="confirmPassword"]').value;
    
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
        alert('Username already taken');
        return;
    }
    
    // Add new user
    users.push({
        username,
        email,
        password
    });
    
    // Save updated users array
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    alert('Account created successfully! Please login.');
    showTab('login');
});

// Add social login functionality
function socialLogin(provider) {
    // This simulates social login - in production would integrate with actual OAuth
    switch(provider) {
        case 'google':
            // Simulate Google login success
            handleSocialLoginSuccess({
                id: 'g_' + Math.random().toString(36).substr(2, 9),
                name: 'Google User',
                email: 'google.user@gmail.com',
                provider: 'google'
            });
            break;
            
        case 'facebook':
            // Simulate Facebook login success
            handleSocialLoginSuccess({
                id: 'fb_' + Math.random().toString(36).substr(2, 9),
                name: 'Facebook User',
                email: 'facebook.user@facebook.com',
                provider: 'facebook'
            });
            break;
    }
}

function handleSocialLoginSuccess(userData) {
    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Show dashboard
    document.querySelector('.auth-container').style.display = 'none';
    document.querySelector('.dashboard-container').style.display = 'flex';
    document.querySelector('.dashboard-container').classList.add('visible');
}