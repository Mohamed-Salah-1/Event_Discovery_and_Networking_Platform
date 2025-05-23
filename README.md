# Event Discovery and Networking Platform

A web-based platform for discovering events and networking opportunities in Saudi Arabia. This platform helps users find, participate in, and network at various events across different cities.

## Prerequisites

Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Git (optional, for version control)

## Development Environment

- **Operating System**: Windows 10/11, macOS, or Linux
- **Node.js Version**: 14.x or higher
- **Package Manager**: npm (comes with Node.js)
- **Text Editor/IDE**: Visual Studio Code recommended
  - Recommended VS Code extensions:
    - Live Server
    - JavaScript (ES6) code snippets
    - HTML CSS Support
    - ESLint

## Installation

1. **Clone or download the project**
   - Download and extract the project files to your desired location
   - Or clone using Git:
   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**
   - Open Command Prompt or PowerShell in the project directory
   - Run the following command:
   ```bash
   npm install
   ```
   This will install all required dependencies listed in `package.json`:
   - express: ^5.1.0 (Web framework)
   - cors: ^2.8.5 (Cross-origin resource sharing)

## Running the Application

1. **Start the server**
   - In the project directory, run:
   ```bash
   node server.js
   ```
   - The server will start on port 3000
   - You should see a message: "Server is running on port 3000"

2. **Access the application**
   - Open your web browser
   - Go to: `http://localhost:3000`
   - The application should now be running

## Project Structure

```
├── server.js              # Main server file
├── package.json          # Project dependencies
├── package-lock.json     # Dependency lock file
├── index.html           # Main page
├── events.html          # Events listing page
├── networking.html      # Networking features
├── feedback.html        # User feedback system
├── admin.html          # Admin dashboard
├── signin.html         # User sign in
├── signUp.html         # User registration
├── style.css           # Main stylesheet
├── script.js           # Main client-side script
├── auth.js             # Authentication handling
├── admin.js            # Admin functionality
├── feedback.js         # Feedback system
├── networking.js       # Networking features
├── navbar.js           # Navigation bar
├── footer.html         # Footer component
├── images/            # Image assets
├── events/            # Event-specific pages
├── users.json         # User data storage
├── events.json        # Event data storage
└── feedback.json      # Feedback data storage
```

## Features

### Event Management
- Browse events by location and interest
- View detailed event information
- Filter events by date, location, and category
- View event images and descriptions
- Access event links and ticket information

### User Authentication
- User registration and login
- Secure password handling
- User profile management
- Session management

### Networking Features
- Connect with other event participants
- Share event information
- Network with professionals in your field
- Build professional relationships

### Feedback System
- Submit event feedback
- Rate events
- Provide suggestions
- View feedback history

### Admin Dashboard
- Manage users and events
- Approve/remove feedback
- View system statistics
- Manage event listings

### Responsive Design
- Mobile-friendly interface
- Cross-browser compatibility
- Adaptive layouts
- Touch-friendly navigation

## Configuration

### Port Configuration
- Default port: 3000
- To change the port:
  1. Open `server.js`
  2. Locate the port variable
  3. Change the port number
  4. Restart the server

### Admin Access
- Default admin credentials:
  - Username: admin
  - Password: admin123
- Change these credentials in `users.json` for security

## Troubleshooting

### Common Issues and Solutions

1. **Port already in use**
   - Error: "EADDRINUSE: address already in use :::3000"
   - Solutions:
     - Close other applications using port 3000
     - Change the port in `server.js`
     - Run `netstat -ano | findstr :3000` to find the process using the port
     - Use Task Manager to end the process

2. **Module not found errors**
   - Error: "Cannot find module 'express'"
   - Solutions:
     - Run `npm install` again
     - Delete `node_modules` folder and `package-lock.json`
     - Run `npm install` to reinstall dependencies
     - Check `package.json` for correct dependencies

3. **Node.js not found**
   - Error: "'node' is not recognized"
   - Solutions:
     - Verify Node.js installation:
     ```bash
     node --version
     npm --version
     ```
     - Reinstall Node.js
     - Add Node.js to system PATH

4. **JSON file errors**
   - Error: "Unexpected token in JSON"
   - Solutions:
     - Check JSON file syntax
     - Ensure files are properly formatted
     - Verify file permissions

5. **Browser issues**
   - Clear browser cache
   - Try different browser
   - Disable browser extensions
   - Check console for errors (F12)

## Stopping the Server

- Press `Ctrl + C` in the terminal where the server is running
- This will gracefully shut down the server
- Wait for the "Server stopped" message

## Security Notes

- The application uses local JSON files for data storage
- In a production environment, consider using a proper database
- Admin credentials are stored in `users.json`
- Default admin credentials should be changed in production
- Implement proper password hashing
- Use environment variables for sensitive data
- Enable HTTPS in production
- Regular security updates recommended

## Performance Tips

- Keep `node_modules` in `.gitignore`
- Regular cleanup of temporary files
- Optimize images before uploading
- Use browser caching
- Minimize HTTP requests
- Regular backups of JSON data files

## Support

For any issues or questions:
1. Check the troubleshooting section
2. Review the documentation
3. Contact the project maintainer
4. Submit an issue on the repository

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is copyrighted. All rights reserved. See the [LICENSE](./LICENSE) file for details.

