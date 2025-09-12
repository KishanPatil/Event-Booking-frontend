
# Healthcare Frontend

A **role-based Patient Workflow Management System** frontend built with **React, Vite, Redux Toolkit, and Material-UI**.
This application allows Patients, Doctors, and Admins to manage appointments, medical records, and dashboards seamlessly.

Backend: [Node.js + Express + MySQL](https://github.com/KishanPatil/healthcare-backend.git) (included in backend repo/zip).

---

## 🚀 Features

### 👩‍⚕️ User Side (Patients)

* Browse doctors by specialty, location, and availability
* View doctor profiles with photos, bio, and expertise
* Book appointments with slot selection (10:00–18:00, except 13:00–14:00)
* View appointment history and medical records
* Manage profile

### 🧑‍⚕️ Doctor/Admin Side

* Manage schedules
* Access patient records and appointment statuses
* Admin-only: Add new doctors with file upload (profile picture)

### 🔒 Authentication

* JWT-based login & registration
* Role-based access: **Patient / Doctor / Admin**
* Protected routes with `PrivateRoute`
* Persistent login via `localStorage`

---

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite, Redux Toolkit, React Router, Material-UI (MUI)
* **State Management:** Redux Toolkit (slices for auth, doctors, appointments, records)
* **Styling:** Material-UI, custom components (ToggleBox, CustomButton)
* **Backend:** Node.js, Express, MySQL (JWT authentication, REST APIs)
* **API Client:** Axios wrapper (`fetcher.js`) with token injection
* **Auth:** JWT (`jwt-decode`)
* **Dev Tools:** ESLint, Postman collection

---

## 📂 Project Structure

```
Innobot-Heathcare-Frontend/
├── public/                # static assets
├── src/
│   ├── assets/            # images, icons
│   ├── components/
│   │   ├── auth/          # Login, Register
│   │   ├── navbar/        # Navbar, Layout
│   │   ├── doctors/       # DoctorCard, DoctorList
│   │   ├── appointments/  # AppointmentForm, Booking
│   │   ├── records/       # MedicalRecordList, RecordDetail
│   │   └── commonUI/      # ToggleBox, CustomButton, reusable UI
│   ├── pages/             # Page-level components
│   ├── routes/            # AppRoutes, PrivateRoute
│   ├── store/
│   │   ├── store.js       # Redux store configuration
│   │   └── slice/
│   │       ├── authSlice.js
│   │       ├── doctorSlice.js
│   │       ├── appointmentSlice.js
│   │       └── recordSlice.js
│   ├── utils/
│   │   ├── apiConstant.js # API endpoints
│   │   └── fetcher.js     # Axios wrapper
│   ├── App.jsx            # Root app component
│   ├── main.jsx           # Entry point with Provider + Router
│   └── index.css          # Global styles
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/KishanPatil/healthcare-frontend.git
cd Innobot-Heathcare-Frontend
npm install
```

### 2. Environment Variables

Create `.env` in project root:

```
VITE_API_BASE_URL=http://localhost:5000
```

> ⚠️ By default, `src/utils/apiConstant.js` points to `http://localhost:5000`. For deployment, update it to use the `.env` variable.

### 3. Run Frontend

```bash
npm run dev
# open http://localhost:5173
```

### 4. Run Backend (from backend.zip)

```bash
cd backend
npm install
# configure .env with DB credentials & JWT_SECRET
npm run migrate
npm run dev
# runs on http://localhost:5000
```

---

## 🔑 API Endpoints

Frontend communicates with these REST APIs:

* `POST /api/auth/login` → Login
* `POST /api/auth/register` → Register
* `GET /api/doctors` → List doctors
* `POST /api/doctors` → Add doctor (Admin only, FormData upload)
* `POST /api/appointments` → Book appointment
* `GET /api/appointments` → Get appointments
* `GET /api/medical-records` → Get patient records
* `POST /api/medical-records/add` → Add medical record

See `innobot-health.postman_collection.json` for full API docs.

---

## 🖼️ UI Highlights

* **Mini Drawer Navbar** (MUI): Toggleable drawer with dashboard, booking, doctors, and records.
* **DoctorCard:** Renders doctor info + profile image (base64 converted).
* **AppointmentForm:** Responsive booking form with timeslot dropdown.
* **Reusable Components:** `ToggleBox` (dropdown), `CustomButton` (MUI wrapper).
* **Role-Based UI:** Add Doctor button & modal visible only for Admin.

---

## ⚠️ Common Issues & Fixes

1. **Redux serializability warnings (Max call stack exceeded)**

   * Don’t store raw `Buffer` profile pictures in Redux. Convert to Base64 string before storing.

2. **`useNavigate` outside Router**

   * Ensure `BrowserRouter` wraps the app in `main.jsx`.

3. **Auth context missing**

   * Wrap `<Provider store={store}>` and `<AuthProvider>` inside Router.

4. **401 Unauthorized**

   * Token expired. `authSlice.initializeUserRole` handles logout if token is invalid.

---

## 📊 Roadmap

* [ ] Dashboard analytics with Recharts / MUI Charts
* [ ] Notifications for upcoming appointments
* [ ] Docker setup (frontend + backend)
* [ ] CI/CD pipeline (GitHub Actions / Vercel)
* [ ] Role-based route guards (Admin vs Doctor vs Patient)

---

## 🤝 Contribution

1. Fork repo
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push branch (`git push origin feature/new-feature`)
5. Open Pull Request

