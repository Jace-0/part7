# Blog App

Welcome to the Blog App! This application lets users upload blog titles and links, interact by liking and commenting, and delete their blogs.

## Key Features

- **Upload Blogs**: Add blog titles and links.
- **Interact**: Like and comment on blogs.
- **Manage Blogs**: Delete blogs you've created.
- **Authentication**: Secure login and signup.

## Quick Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/blog-app.git
   cd bloglist-App
   ```

2. **Install Dependencies**:

   ```bash
   cd packages/frontend && npm install
   cd packages/backend && npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the backend root with:

   ```
   MONGODB_URI=
   PORT=
   SECRET='SecretKey'
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the App**:
   ```bash
   cd packages/backend
   npm run build:ui
   npm start
   ```

## Usage

- **Sign Up** and **Log In** to access features.
- **Upload**, **Like**, and **Delete** blogs.

## Technologies

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Assets

Include images from the `assets` folder in your documentation or UI:

- ![Image 1](../bloglist-App/assests/image.png)
- ![Image 2](../bloglist-App/assests/image0.png)
- ![Image 3](../bloglist-App/assests/image1.png)
