# VRV_Authentication **Role-Based Access Control (RBAC) System**


A secure **Role-Based Access Control (RBAC) System** developed with **Flask**, **MongoDB**, and **JWT Authentication**. This project provides robust authentication and authorization features, ensuring proper role-based access for **Admin** and **User** roles. The system includes password management, secure sessions, and role-specific functionalities. 

---

## **🚀 Features**

### **Authentication**
- 🔒 **User Registration:** Secure registration with encrypted credentials.
- 🔑 **Login:** JWT-based authentication for secure user sessions.
- 🔄 **Forget Password:** Reset forgotten passwords via OTP sent to email.
- ✅ **Verify OTP:** Secure OTP verification for password recovery.
- 🛠️ **Reset Password:** Create a new password after OTP verification.
- 🚪 **Logout:** Token invalidation for secure logouts.

### **Authorization**
- 🛡️ **RBAC (Role-Based Access Control):** Access based on roles (**Admin**, **User**).
- 🔐 **Restricted Access:** Admins have elevated permissions to modify user details.
- 👤 **User Role:** Can only view their profile without making changes.

### **Profile Management**
- 📄 **View Profile:** Users can securely view their personal details.
- ✏️ **Admin Access:** Admins can update or modify user profiles.
- 🖼️ **Upload Profile Picture:** Role-restricted functionality for profile updates.

---

## **📂 Project Structure**

```plaintext
.
├── app/
│   ├── __init__.py                 # Application setup and initialization
│   ├── routes.py                   # All routes and API endpoints
│   ├── models.py                   # Database models
│   ├── utils.py                    # Utility functions (e.g., JWT handling)
│   ├── config.py                   # Application configurations
│   ├── login.py                    # Login functionality
│   ├── logout.py                   # Logout functionality
│   ├── profile.py                  # Profile management
│   ├── reset_password.py           # Password reset functionality
│   ├── signup.py                   # Signup functionality
│   ├── static/
│   |    ├── css/
│   |   │   └── styles.css          # CSS styles for the application
│   |   ├── images/                 # Directory for storing static images
│   |   └── js/
│   |       └── scripts.js          # JavaScript files for interactivity
|   ├── templates/                      # HTML templates for the frontend
│           ├── index.html                  # Landing page
│           ├── home.html                   # Home page
│           ├── profile.html                # Profile page
│           ├── forgot-password.html        # Forgot password page
│           ├── reset-password.html         # Reset password page
│           └── verify-otp.html             # OTP verification page
├── uploads/
│   └── profile.png                 # Placeholder for profile picture uploads
├── run.py                          # Main entry point for running the application
├── setup.py                        # Setup script for the project
├── README.md                       # Project documentation
├── requirements.txt                # Python dependencies
└── .env                            # Environment variables for configuration


---

## **🔑 Role Definitions and Access Control**

| **Role**   | **Access Level**                                                                             |
|------------|----------------------------------------------------------------------------------------------|
| **Admin**  | - View, update, or delete user profiles<br>- Manage all resources<br>- Elevated privileges   |
| **User**   | - View own profile<br>- Cannot update or delete personal data                                |

---

## **🔗 API Endpoints**

### **Authentication**
| **Method** | **Endpoint**          | **Description**                       |
|------------|-----------------------|---------------------------------------|
| `POST`     | `/register`           | Register a new user                   |
| `POST`     | `/login`              | Authenticate user and generate JWT    |
| `POST`     | `/logout`             | Invalidate user session               |

### **Password Management**
| **Method** | **Endpoint**           | **Description**                       |
|------------|------------------------|---------------------------------------|
| `POST`     | `/forget_password`     | Request OTP for password reset        |
| `POST`     | `/verify_otp`          | Verify OTP for resetting password     |
| `POST`     | `/reset_password`      | Reset password after OTP verification |

### **Profile Management**
| **Method** | **Endpoint**           | **Description**                       |
|------------|------------------------|---------------------------------------|
| `GET`      | `/api/user-profile`    | View personal profile                 |
| `POST`     | `/admin/update_user`   | Admin-only: Update user details       |
| `POST`     | `/upload_profile_picture` | Upload or update profile picture      |

---

## **🛠️ Setup and Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/rbac-system.git
   cd rbac-system
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**
   Create a `.env` file:
   ```plaintext
   SECRET_KEY=your-secret-key
   JWT_ALGORITHM=HS256
   MONGO_URI=mongodb://localhost:27017/rbacDB
   UPLOAD_FOLDER=static/uploads
   ```

4. **Run the Application**
   ```bash
   flask run
   ```

---

## **📜 Information **

### **Security Best Practices**
- 🔑 Passwords are hashed using **bcrypt**.
- 🔒 JWT ensures secure session management.
- ✅ Restricted access to resources via role-based permissions.

### **RBAC (Role-Based Access Control)**
- Flexible role management system for **Admins** and **Users**.
- Admin-only privileges for sensitive operations.

### **Code Quality**
- Modular structure with clean and maintainable code.
- Comprehensive in-line documentation.

### **Creativity**
- Enhanced password recovery features with OTP verification.
- Advanced profile management functionalities.

---

## **🎨 Icons and Design**
Icons enhance UI aesthetics and functionality:
- ![Admin](https://img.icons8.com/ios-filled/50/000000/admin-settings-male.png) **Admin Panel**
- ![User](https://img.icons8.com/ios-filled/50/000000/user.png) **User Profile**
- ![Lock](https://img.icons8.com/ios-filled/50/000000/lock.png) **Password Management**

---

## **📧 Contact**

For queries or suggestions:
- **Email:** your-email@example.com
- **GitHub:** [YourGitHub](https://github.com/YourGitHub)

---

**✨ Crafted for secure systems with passion!**  
![Flask](https://img.icons8.com/ios-filled/50/000000/flask.png)