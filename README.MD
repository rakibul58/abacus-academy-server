# Abacus Academy

[Live Site](https://abacus-academy-server-swart.vercel.app/)

A Node.js/Express backend server for the Abacus Academy e-learning platform.

## Features

- User authentication and role-based authorization (student/teacher)
- Course management system
- Video content management
- Enrollment tracking
- MongoDB integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Cors
- Dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Stripe account (for payments)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_USER=
DB_PASS=
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/rakibul58/abacus-academy-server.git
cd abacus-academy-server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node index.js
```

## API Endpoints

### Courses
- `GET /allcourses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `GET /courses?email=:email` - Get courses by teacher email
- `POST /courses` - Create new course
- `DELETE /courses/:id` - Delete course

### Videos
- `GET /videos/:id` - Get videos by course ID
- `POST /videos` - Add new video
- `DELETE /videos/:id` - Delete video

### Users
- `GET /users?email=:email` - Get user by email
- `POST /users` - Create new user
- `GET /users/student/:email` - Check if user is student
- `GET /users/teacher/:email` - Check if user is teacher

### Enrollment
- `GET /enroll?email=:email` - Get enrolled courses by student email
- `POST /enroll` - Enroll in a course

## Database Schema

### Collections
- courses
- videos
- users
- enroll

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License