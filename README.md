## Wander Inn

Full‑stack MERN application for property listings and bookings with user auth and admin features.

### Tech Stack

- **Frontend**: React (Vite), React Router, TailwindCSS, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary, Multer

### Project Structure

```
.
├─ backend/        # Express API, MongoDB, auth, upload
└─ frontend/       # React app (Vite + Tailwind)
```

### Prerequisites

- **Node.js** 16+ (LTS recommended)
- **MongoDB Atlas** connection string
- **Cloudinary** account (for image uploads)

### 1) Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` with:

```env
# Database
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>/wander_inn

# Auth
JWT_SECRET=change_me_to_a_strong_random_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=http://localhost:5173

# Server
NODE_ENV=development
PORT=8000
```

Start the API:

```bash
npm run dev
```

Server runs on `http://localhost:8000`.

### 2) Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`.

### Available Scripts

- **backend**: `npm run dev` (nodemon on port 8000)
- **frontend**: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`

### Key API Mount Points

- ` /api/auth/*` — Authentication
- ` /api/user/*` — User management
- ` /api/listing/*` — Listings
- ` /api/booking/*` — Bookings
- ` /api/admin/*` — Admin

### Notes

- Ensure both servers are running. CORS is configured to `FRONTEND_URL` (default `http://localhost:5173`).
- Backend expects a writable `backend/public/` directory for temporary files.

### Troubleshooting

- **MongoDB connection failed**: verify `MONGODB_URL` and IP allowlist on Atlas.
- **Cloudinary upload failed**: check Cloudinary credentials.
- **CORS errors**: ensure `FRONTEND_URL` in backend `.env` matches the frontend URL.
- **JWT errors**: set a strong `JWT_SECRET` and restart the backend.

### License

This project is for educational purposes.
