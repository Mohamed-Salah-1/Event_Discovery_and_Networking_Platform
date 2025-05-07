const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// File to store users
const usersFile = path.join(__dirname, "users.json");

// Load existing users from file
let users = [];
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile));
} else {
  // Initialize with default admin user
  users = [
    { username: "admin", email: "admin@example.com", firstName: "Admin", lastName: "User", password: "admin123" },
  ];
  fs.writeFileSync(usersFile, JSON.stringify(users));
}

// File to store events
const eventsFile = path.join(__dirname, "events.json");

// Load existing events from file
let events = [];
if (fs.existsSync(eventsFile)) {
  events = JSON.parse(fs.readFileSync(eventsFile));
} else {
  // Initialize with default events if the file doesn't exist
  events = [
    {
      id: "1",
      title: "Saudi Arabian Grand Prix 2025",
      location: "Riyadh",
      interest: "Sports",
      date: "18/04/2025",
      description: "Excitement is in the air as the Saudi Arabian Grand Prix returns to Jeddah Corniche Circuit.",
      image: "images/Saudi_Arabian_Grand_Prix_2025.jpg",
      link: "https://tickets.saudiarabiangp.com/?utm_source=sem&utm_medium=zmkn&utm_campaign=en&gclid=CjwKCAjw5PK_BhBBEiwAL7GTPSSdo9inmL5VhrhvV0T0oWtmhWYgWUqgZkuAPTGEe7aNpoPwpo-DvBoC1I8QAvD_BwE",
      ticketPrice: 300,
    },
    {
      id: "2",
      title: "Riyadh Racing Season Race Night",
      location: "Riyadh",
      interest: "Sports",
      date: "18/01/2025",
      description: "A race night at King Abdulaziz Racecourse is an evening like no other.",
      image: "images/Riyadh Racing Season Race Night.jpg",
      link: "https://webook.com/en/events/riyadh-racing-season-rsace-night-42",
      ticketPrice: 20,
    },
    {
      id: "3",
      title: "English Club",
      location: "Khafji",
      interest: "Education",
      date: "03/06/2025",
      description: "The yearly English Club event.",
      image: "images/English_Club.jpg",
      link: "events/english_club.html",
      ticketPrice: 0,
    },
    {
      id: "4",
      title: "Arab Music Concert",
      location: "Dammam",
      interest: "Music",
      date: "31/03/2025",
      description: "A Concert in Dammam for Arab Music lovers and artists.",
      image: "images/Arab Music Concert.jpg",
      link: "events/arab_music_concert.html",
      ticketPrice: 0,
    },
    {
      id: "5",
      title: "Ai Discovery Conference",
      location: "Jeddah",
      interest: "Technology",
      date: "04/04/2025",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "images/ai discovery.jpg",
      link: "events/Ai_Discovery_Conference.html",
      ticketPrice: 0,
    },
  ];
  fs.writeFileSync(eventsFile, JSON.stringify(events));
}

// File to store feedback
const feedbackFile = path.join(__dirname, "feedback.json");

// Initialize feedback file if it doesn't exist
if (!fs.existsSync(feedbackFile)) {
  fs.writeFileSync(feedbackFile, JSON.stringify([]));
}

// Endpoint to save feedback
app.post("/api/feedback", (req, res) => {
  const feedback = req.body;
  const existingFeedback = JSON.parse(fs.readFileSync(feedbackFile));
  feedback.approved = false; // Initial state is unapproved
  existingFeedback.push(feedback);
  fs.writeFileSync(feedbackFile, JSON.stringify(existingFeedback));
  res.status(201).send("Feedback saved successfully");
});

// Endpoint to get feedback
app.get("/api/feedback", (req, res) => {
  const feedback = JSON.parse(fs.readFileSync(feedbackFile));
  res.json(feedback);
});

// --- Admin Section Start ---
const ADMIN_PASSWORD = "admin123"; // Change this to a secure password
const ADMIN_TOKEN = "secret-admin-token"; // Simple token for demo

// Middleware to check admin token
function requireAdmin(req, res, next) {
  if (req.headers.authorization === ADMIN_TOKEN) return next();
  res.status(403).json({ error: "Unauthorized" });
}

// Admin login
app.post("/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_TOKEN });
  } else {
    res.json({ success: false });
  }
});

// Admin stats
app.get("/admin/stats", requireAdmin, (req, res) => {
  res.json({
    eventCount: events.length,
    userCount: users.length,
    users,
    events,
    feedbacks: getFeedbacks().map((f, i) => ({ id: i, ...f })),
  });
});

// Add user
app.post("/admin/addUser", requireAdmin, (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  // Check if username or email already exists
  if (users.some((u) => u.username === username)) {
    return res.json({ success: false, error: "Username already exists" });
  }
  if (users.some((u) => u.email === email)) {
    return res.json({ success: false, error: "Email already in use" });
  }

  // Add new user to the array and save to file
  users.push({
    username,
    email,
    firstName,
    lastName,
    password, // In a real app, you should hash the password
  });
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.json({ success: true });
});

// Admin remove user endpoint
app.post("/admin/removeUser", requireAdmin, (req, res) => {
  const { username } = req.body;

  // Don't allow removing the admin user
  if (username === "admin") {
    return res.json({ success: false, error: "Cannot remove admin user" });
  }
  // Remove user from the array and save to file
  users = users.filter((u) => u.username !== username);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  res.json({ success: true });
});

// Add event
app.post("/admin/addEvent", requireAdmin, (req, res) => {
  const { title, location, interest, date, description, image, link, ticketPrice } = req.body;
  const newEvent = {
    id: Date.now().toString(),
    title,
    location,
    interest,
    date,
    description,
    image,
    link,
    ticketPrice,
  };
  events.push(newEvent);
  fs.writeFileSync(eventsFile, JSON.stringify(events));
  res.json({ success: true });
});

// Remove event
app.post("/admin/removeEvent", requireAdmin, (req, res) => {
  const { id } = req.body;
  events = events.filter((e) => e.id !== id);
  fs.writeFileSync(eventsFile, JSON.stringify(events));
  res.json({ success: true });
});

// Approve feedback (mark feedback as approved)
app.post("/admin/approveFeedback", requireAdmin, (req, res) => {
  const { id } = req.body;
  let feedbacks = JSON.parse(fs.readFileSync(feedbackFile));
  feedbacks[id].approved = true; // Mark feedback as approved
  fs.writeFileSync(feedbackFile, JSON.stringify(feedbacks, null, 2));
  res.json({ success: true });
});

// Reject feedback (remove feedback)
app.post("/admin/rejectFeedback", requireAdmin, (req, res) => {
  const { id } = req.body;
  let feedbacks = JSON.parse(fs.readFileSync(feedbackFile));
  feedbacks = feedbacks.filter((_, i) => i !== parseInt(id)); // Remove feedback
  fs.writeFileSync(feedbackFile, JSON.stringify(feedbacks, null, 2));
  res.json({ success: true });
});

// Endpoint to get all events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// --- Admin Section End ---

// User login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  
  // Find user by username or email
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  
  if (user) {
    // Return user data without password
    const { password, ...userData } = user;
    res.json({ success: true, user: userData });
  } else {
    res.json({ success: false, error: "Invalid username or password" });
  }
});

// User signup endpoint
app.post("/api/signup", (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  // Check if username or email already exists
  if (users.some(u => u.username === username)) {
    return res.json({ success: false, error: "Username already exists" });
  }
  if (users.some(u => u.email === email)) {
    return res.json({ success: false, error: "Email already in use" });
  }

  // Create new user
  const newUser = {
    username,
    email,
    firstName,
    lastName,
    password, // In a real app, you should hash the password
  };

  // Add to users array
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users));

  // Return user data without password
  const { password: _, ...userData } = newUser;
  res.json({ success: true, user: userData });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Helper function to get feedbacks
function getFeedbacks() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "feedback.json")));
  } catch {
    return [];
  }
}