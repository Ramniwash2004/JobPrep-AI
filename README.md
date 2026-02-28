# PrepareForJob-AI – Full Stack Gen AI Job Preparation Web App
Build a Production-Ready Full Stack Gen AI Job Preparation Web Application — from authentication and resume processing to AI-powered interview preparation using React, Node.js, JWT, Gemini AI, and Puppeteer.

# what we will learn from this project
🔐 Secure Authentication using JWT
🚫 Token Blacklisting Implementation
🤖 AI Integration using Gemini API
📄 Resume Parsing & Skill Extraction Logic
📊 AI-Based Skill Gap Detection
🧠 AI-Powered Interview Question Generation
📝 ATS-Optimized Resume Generation
📑 Dynamic PDF Generation using Puppeteer
🏗 Real-World Scalable Project Structuring

# Project structure
   ```bash
   PrepareForJob/
│
├── client/                # React Frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── services/
│
├── server/                # Node + Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── services/
│
└── README.md
   ```

# Tech Stack Used

**Frontend**
- React.js
- Axios
- React Router
- Context API / Redux (if used)

**Backend**
- Node.js
- Express.js
- Authentication
- JWT (JSON Web Token)
- Token Blacklisting Strategy
- AI Integration
- Gemini API

**PDF Generation**
- Puppeteer

**Database (if applicable)**
- MongoDB / PostgreSQL
  
# Clone the Repository
```bash
git clone https://github.com/your-username/PrepareForJob.git
cd PrepareForJob
```

# Setup Backend
```bash
cd backend
npm install
```
# Setup Frontend
```bash
cd client
npm install
npm start
```

# .env file setup
```bash
PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```