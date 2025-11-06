# 🎟️ Event Booking Frontend

A React-based **event booking platform** with real-time seat updates, JWT authentication, and Redux state management.
Built with **React**, **Redux Toolkit**, **Material-UI**, and **Socket.IO** for live event updates.

---

## 🚀 Features

✅ **User Authentication** (JWT-based login & protected routes)
✅ **Event Listing** (fetched from backend API)
✅ **Event Detail Page** (real-time availability via Socket.IO)
✅ **Ticket Reservation + Payment Confirmation**
✅ **Redux Toolkit Integration** for global state management
✅ **Lazy-loaded routes** for performance optimization
✅ **Responsive UI** built using Material-UI (MUI v5)

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginPage.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── events/
│   │   └── EventDetail.jsx
│   ├── navbar/
│   │   └── NavbarLayout.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│   └── PrivateRoute.jsx
│
├── store/
│   ├── slice/
│   │   └── eventSlice.js
│   └── store.js
│
├── utils/
│   └── fetcher.js           # Axios base config with token
│
├── socket.js                # Global Socket.IO client instance
├── App.js
└── index.js
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/event-booking-frontend.git
cd event-booking-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_SOCKET_URL=http://localhost:4000
```

### 4️⃣ Start the development server

```bash
npm start
```

Your app will be available at **[http://localhost:3000](http://localhost:3000)**

---

## 🔌 API Integration

This frontend communicates with a backend server (`http://localhost:4000`) through REST APIs:

| Endpoint                  | Method | Description                    |
| ------------------------- | ------ | ------------------------------ |
| `/api/events`             | GET    | Fetch all events               |
| `/api/events/:id`         | GET    | Fetch a single event by ID     |
| `/api/events/:id/reserve` | POST   | Reserve a ticket for an event  |
| `/api/events/confirm`     | POST   | Confirm (simulate payment)     |
| `/api/auth/login`         | POST   | User login (returns JWT token) |

### 🔑 JWT Authentication

* Token is stored in `localStorage`.
* Axios adds the token to all requests via:

  ```js
  headers: { Authorization: `Bearer ${token}` }
  ```

---

## 🔄 Real-time Updates (Socket.IO)

* A global socket client is created in `src/socket.js`:

  ```js
  import { io } from "socket.io-client";
  export const socket = io(process.env.REACT_APP_SOCKET_URL);
  ```
* When a user opens an event:

  ```js
  socket.emit("joinEvent", eventId);
  ```
* Backend emits:

  ```js
  io.to(eventId).emit("availability", { _id, availableTickets });
  ```
* Frontend listens and updates Redux:

  ```js
  socket.on("availability", (data) => {
    dispatch(updateAvailability(data.availableTickets));
  });
  ```

---

## 🧠 Redux Toolkit

### **eventSlice.js**

Handles all event-related state:

* `fetchEvents` → Fetch all events
* `fetchEventById` → Fetch single event by ID
* `updateAvailability` → Real-time update from socket
* `clearSelectedEvent` → Reset state on unmount

**Example Usage**

```js
const dispatch = useDispatch();
const { list, selectedEvent, loading } = useSelector((state) => state.events);

useEffect(() => {
  dispatch(fetchEvents());
}, []);
```

---

## 🧩 Lazy Loading Routes

All major routes are lazy-loaded for better performance:

```js
const Dashboard = React.lazy(() => import("../components/dashboard/Dashboard"));
const EventDetail = React.lazy(() => import("../components/events/EventDetail"));

<Routes>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/events/:id" element={<EventDetail />} />
</Routes>
```

---

## 💅 UI / Styling

* Built using **Material-UI (MUI v5)** components.
* Consistent spacing and layout via MUI’s `Box`, `Card`, `Typography`.
* Progress indicators for async states (`CircularProgress`, `LinearProgress`).

---

## 🧭 Example Flow

1️⃣ User logs in → JWT stored in `localStorage`.
2️⃣ Navigates to `/events` → Event list fetched via `fetchEvents`.
3️⃣ Clicks an event → Details loaded from `/events/:id`.
4️⃣ Real-time ticket availability updates via socket.
5️⃣ Click **Reserve Now** → Calls `/events/:id/reserve`.
6️⃣ Backend responds → Frontend calls `/events/confirm`.
7️⃣ On success → Redirects to `/events`.

---

## 🧰 Tech Stack

| Category         | Library / Tool     |
| ---------------- | ------------------ |
| UI               | React, Material-UI |
| State Management | Redux Toolkit      |
| API              | Axios              |
| Routing          | React Router v6    |
| Real-time        | Socket.IO Client   |
| Authentication   | JWT                |
| Code Quality     | ESLint + Prettier  |

---

## 🧑‍💻 Development Tips

* Always wrap API calls in try/catch blocks.
* Use Redux store instead of component state for consistency.
* Handle token expiry → redirect to `/login`.
* When adding new features (like Admin Panel), extend slices for scalability.

---

