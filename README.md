# Virtual Assistant Project

A full-stack virtual assistant application with AI-powered responses using Google Gemini API, user authentication, and customizable assistant features.

## 🚀 Project Structure

```
Virtual Assistant/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/           # React Context for state management
│   │   ├── pages/             # Application pages
│   │   └── assets/            # Images and static files
│   └── package.json
├── server/                     # Node.js Backend
│   ├── config/                # Configuration files
│   │   ├── cloudinary.js      # Cloudinary setup for image uploads
│   │   └── token.js           # JWT token generation
│   ├── controllers/           # Route handlers
│   │   ├── auth.controller.js # Authentication logic
│   │   └── user.controller.js # User and AI assistant logic
│   ├── db/                    # Database configuration
│   │   └── db.js              # MongoDB connection
│   ├── middleware/            # Custom middleware
│   │   ├── isAuth.js          # Authentication middleware
│   │   └── multer.js          # File upload middleware
│   ├── models/                # Database models
│   │   └── user.models.js     # User schema
│   ├── routes/                # API routes
│   │   ├── auth.routes.js     # Authentication routes
│   │   └── user.route.js      # User and assistant routes
│   ├── gemini.js              # Google Gemini AI integration
│   ├── server.js              # Main server file
│   └── package.json
└── README.md                  # This file
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **Google Generative AI** - AI responses
- **Moment.js** - Date/time handling
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Context API** - State management

## 🔧 Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database
MONGO_DB_URL=mongodb+srv://VAI:VAI@cluster0.pbvmubn.mongodb.net/VAI?retryWrites=true&w=majority&appName=Cluster0

# JWT Authentication
JWT_SECRET=SAGAR

# Cloudinary (Image Upload Service)
CLOUD_NAME=dpnh3kkyc
CLOUD_API_KEY=593961483445776
CLOUD_API_SECRET=2gBlxxp0B9Q5xaCap1oQjN1goh0

# Google Gemini AI
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDg_7W1vaSnQe2CuSULFRyf_Ob6QeAvIfI
GEMINI_API_KEY=AIzaSyDg_7W1vaSnQe2CuSULFRyf_Ob6QeAvIfI
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Routes (`/api/auth`)

#### 1. Sign Up
- **POST** `/api/auth/signup`
- **Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with JWT cookie

#### 2. Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with JWT cookie

#### 3. Logout
- **GET** `/api/auth/logout`
- **Response:** Success message

### User Routes (`/api/user`)

#### 1. Get Current User
- **GET** `/api/user/current`
- **Headers:** `Authorization: Bearer <token>` (or cookie)
- **Response:** Current user data

#### 2. Update Assistant
- **POST** `/api/user/update`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** (multipart/form-data)
  ```json
  {
    "assistantName": "JARVIS",
    "imageUrl": "https://example.com/image.jpg"
  }
  ```
- **File:** `assistantImage` (optional)
- **Response:** Updated user object

#### 3. Ask Assistant
- **POST** `/api/user/askToAssistant`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "command": "What time is it?"
  }
  ```
- **Response:**
  ```json
  {
    "type": "get-time",
    "userInput": "What time is it?",
    "response": "current time is 02:30:PM"
  }
  ```

## 🤖 AI Assistant Features

The assistant can handle various command types:

### Supported Command Types
- `general` - General conversation
- `google-search` - Google search queries
- `youtube-search` - YouTube search
- `youtube-play` - Play YouTube videos
- `get-time` - Current time
- `get-day` - Current day
- `get-month` - Current month
- `get_date` - Current date
- `calculator-open` - Open calculator
- `instagram-open` - Open Instagram
- `facebook-open` - Open Facebook
- `weather-show` - Show weather

### Example Commands
```javascript
// Time-related commands
"What time is it?" → Returns current time
"What day is today?" → Returns current day
"What's the date?" → Returns current date

// Search commands
"Search for Node.js tutorials" → Google search
"Play music on YouTube" → YouTube search

// App commands
"Open calculator" → Calculator command
"Open Instagram" → Instagram command
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account
- Google Gemini API key
- Cloudinary account

### Backend Setup
1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with the environment variables above

4. Start the server:
   ```bash
   npm run server  # Development with nodemon
   npm start       # Production
   ```

### Frontend Setup
1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔒 Authentication Flow

1. User signs up or logs in
2. Server generates JWT token
3. Token is stored in HTTP-only cookie
4. Protected routes verify token via `isAuth` middleware
5. User data is attached to `req.userId`

## 📁 Key Files Explained

### Server Files

#### `server.js`
Main server entry point that:
- Sets up Express app
- Configures middleware (CORS, cookies, JSON parsing)
- Connects to MongoDB
- Defines routes
- Starts the server

#### `gemini.js`
Google Gemini AI integration:
- Initializes Gemini API client
- Processes user commands
- Returns structured JSON responses
- Handles system instructions for assistant behavior

#### `controllers/user.controller.js`
Handles user-related operations:
- `getCurrentUser` - Fetch current user data
- `updateAssistant` - Update assistant name/image
- `askToAssistant` - Process AI commands and return responses

#### `controllers/auth.controller.js`
Authentication operations:
- `signUp` - User registration with password hashing
- `Login` - User authentication with JWT
- `logout` - Clear authentication cookies

#### `middleware/isAuth.js`
Authentication middleware that:
- Verifies JWT tokens from cookies
- Attaches user ID to request object
- Protects routes from unauthorized access

#### `models/user.models.js`
User database schema defining:
- User fields (name, email, password)
- Assistant customization (name, image)
- Validation rules

### Client Files

#### `src/context/UserContext.jsx`
React context for:
- User state management
- Authentication status
- Global user data access

#### `src/pages/`
- `Home.jsx` - Main assistant interface
- `SignIn.jsx` - Login page
- `SignUp.jsx` - Registration page
- `Customization.jsx` - Assistant customization

## 🔧 Configuration

### CORS Settings
```javascript
cors({
    origin: "http://localhost:5173",
    methods: ['POST','PUT','GET','PATCH'],
    credentials: true
})
```

### Cookie Settings
```javascript
{
    httpOnly: true,
    maxAge: 7*24*60*60*1000, // 7 days
    sameSite: "strict",
    secure: false // Set to true in production with HTTPS
}
```

## 🚨 Security Notes

- JWT tokens are stored in HTTP-only cookies
- Passwords are hashed using bcrypt
- CORS is configured for specific origins
- Input validation on all endpoints
- Protected routes require authentication

## 🐛 Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   npm install
   npm cache clean --force
   ```

2. **MongoDB connection issues**
   - Check MONGO_DB_URL in .env
   - Ensure MongoDB cluster is running
   - Verify network access

3. **Gemini API errors**
   - Verify GEMINI_API_KEY is correct
   - Check API quota limits
   - Ensure proper internet connection

4. **CORS errors**
   - Check client URL matches server CORS origin
   - Verify credentials: true in requests

## 📝 Development Notes

- Server runs on port 3000 by default
- Client runs on port 5173 (Vite default)
- Database: MongoDB Atlas cluster
- File uploads handled via Cloudinary
- AI responses processed through Google Gemini

## 🔄 Future Enhancements

- Voice recognition integration
- Real-time chat with WebSockets
- Multiple assistant personalities
- Advanced command parsing
- Mobile app development
- Docker containerization

---

**Author:** SAGAR  
**Project:** Virtual Assistant with AI Integration  
**Last Updated:** August 2024