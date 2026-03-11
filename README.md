# 🐾 PetFind — Pet Finder Application

A frontend web application to help users report and find lost or found pets in their community.

---

## 📁 Project Structure

```
petfind-front-end/
├── css/
│   ├── foundPost.css         # Styles for viewing a found pet post
│   ├── homePage.css          # Styles for the home/landing page
│   ├── lostPost.css          # Styles for viewing a lost pet post
│   ├── makeFoundPost.css     # Styles for the create found post form
│   ├── makeLostPost.css      # Styles for the create lost post form
│   ├── signin.css            # Styles for the sign-in page
│   └── signup.css            # Styles for the sign-up page
├── js/
│   ├── foundPostSection.js   # Logic for browsing found pet posts
│   ├── homePage.js           # Home page interactions
│   ├── logout.js             # Handles user logout
│   ├── lostPostSection.js    # Logic for browsing lost pet posts
│   ├── main.js               # Entry point / shared utilities
│   ├── makeFoundPost.js      # Form logic for reporting a found pet
│   ├── makeLostPost.js       # Form logic for reporting a lost pet
│   ├── profile.js            # User profile page logic
│   ├── signin.js             # Sign-in form logic
│   └── signup.js             # Sign-up form logic
└── pages/
    ├── foundPostSection.html    # Browse found pets listings
    ├── futureFeature.html       # Placeholder for upcoming features
    ├── homePage.html            # Landing / home page
    ├── lostPostSection.html     # Browse lost pets listings
    ├── makeFoundPostPage.html   # Form to report a found pet
    ├── makeLostPostPage.html    # Form to report a lost pet
    ├── profilePage.html         # User profile page
    ├── signin.html              # Sign-in page
    └── signup.html              # Sign-up page
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local development server (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code)

### Running the App

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/petfind-front-end.git
   cd petfind-front-end
   ```

2. **Open with a local server:**
   - Using VS Code Live Server: right-click `pages/homePage.html` → *Open with Live Server*
   - Or use Python's built-in server:
     ```bash
     python -m http.server 8080
     ```
     Then navigate to `http://localhost:8080/pages/homePage.html`

---

## ✨ Features

- 🔍 **Browse Lost Pets** — View community posts about missing animals
- 📋 **Browse Found Pets** — See reports of found animals in the area
- 📝 **Report a Lost Pet** — Submit a post with details about your missing pet
- 📝 **Report a Found Pet** — Submit a post about a pet you've found
- 👤 **User Accounts** — Sign up, sign in, and manage your profile
- 🚪 **Logout** — Securely end your session
- 🔮 **Future Features** — More functionality coming soon!

---

## 🧭 Pages Overview

| Page | Description |
|------|-------------|
| `homePage.html` | Landing page and navigation hub |
| `lostPostSection.html` | Browse all lost pet listings |
| `foundPostSection.html` | Browse all found pet listings |
| `makeLostPostPage.html` | Form to report a lost pet |
| `makeFoundPostPage.html` | Form to report a found pet |
| `profilePage.html` | View and manage your user profile |
| `signin.html` | User login |
| `signup.html` | New user registration |
| `futureFeature.html` | Placeholder for upcoming features |

---

## 🛠️ Technologies Used

- **HTML5** — Page structure and markup
- **CSS3** — Styling and layout
- **Vanilla JavaScript** — Client-side interactivity and API calls

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Have questions or suggestions? Open an issue or reach out via the repository's Discussions tab.
