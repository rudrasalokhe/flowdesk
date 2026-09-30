# LaunchPad — B2B Startup Sales & RevOps Platform (Frontend Client)

LaunchPad is a high-density, enterprise-grade B2B SaaS startup sales operations platform designed for lead qualification, automated routing, task management, bulk CSV imports, and revenue telemetry.

> **IMPORTANT ARCHITECTURAL DIRECTIVE**:  
> This project is built **BACKEND-FIRST**. The frontend operates strictly as a REST API client. All lead scoring calculations, assignment logic, duplicate detection, CSV processing, analytics aggregation, and authentication enforcement are delegated to your **FastAPI & PostgreSQL** backend.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Installation
Install project dependencies:
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to create your local `.env` configuration file:
```bash
cp .env.example .env
```
In `.env`, configure your target FastAPI backend URL:
```env
VITE_API_URL=http://localhost:8000
```

### 4. Running the Development Server
Start the local development server:
```bash
npm run dev
```
The application will open automatically at `http://localhost:3000`.

---

## 📂 Architecture & File Structure

```text
src/
├── api/                  # Isolated REST API Service Client layer
│   ├── client.js         # Centralized Axios instance with Bearer token interceptor
│   ├── auth.js           # Auth endpoints (login/logout/me)
│   ├── leads.js          # Lead REST methods (CRUD, assign, convert, activity)
│   ├── tasks.js          # Follow-up task endpoints
│   ├── analytics.js      # Executive reporting & chart data endpoints
│   ├── users.js          # Team members & sales reps endpoints
│   ├── imports.js        # CSV upload & polling endpoints
│   └── notifications.js  # System notifications & read status endpoints
│
├── components/           # Modular UI Components
│   ├── layout/           # Header, Sidebar, Layout wrapper
│   ├── leads/            # LeadScoreBadge, AssignmentModal, LeadTimeline, LeadFilters
│   ├── tasks/            # TaskModal
│   ├── analytics/        # KpiCard
│   ├── users/            # UserCard
│   ├── imports/          # CsvUploader (Drag & Drop), ImportProgress (Polling UI)
│   ├── notifications/    # NotificationPanel (Popover list)
│   └── common/           # Badge, Card, DataTable, LoadingSpinner, EmptyState, ErrorAlert, Modal, Pagination
│
├── pages/                # Route Page Views
│   ├── Login.jsx         # /login
│   ├── Dashboard.jsx     # /dashboard (Executive RevOps overview)
│   ├── Leads.jsx         # /leads (Directory with search & backend filtering)
│   ├── LeadDetails.jsx   # /leads/:id (Smart Score, Assignment, Audit Log)
│   ├── CreateLead.jsx    # /leads/new (Inbound lead submission form)
│   ├── Tasks.jsx         # /tasks (Follow-up task SLAs)
│   ├── Analytics.jsx     # /analytics (Recharts reports & funnel)
│   ├── Team.jsx          # /team (Sales reps capacity & workload)
│   ├── ImportLeads.jsx   # /imports (Bulk CSV async upload & polling)
│   └── Notifications.jsx # /notifications (Alerts center)
│
├── context/
│   └── AuthContext.jsx   # Bearer JWT token lifecycle & session state
│
├── hooks/
│   └── useApi.js         # Standardized API state hook (loading, error, retry)
│
├── utils/
│   └── formatters.js     # Currency, number, date, and badge styling utilities
│
└── mock/
    └── mockData.js       # Isolated fallback data for out-of-the-box preview
```

---

## 🔌 Expected FastAPI Endpoints Specification

Your FastAPI backend should implement the following REST API contracts:

### 🔐 Authentication (`src/api/auth.js`)
- `POST /auth/login`  
  - **Body**: `{ "email": "admin@company.com", "password": "password" }`  
  - **Response**: `{ "access_token": "<JWT_STRING>", "token_type": "bearer" }`
- `GET /auth/me`  
  - **Headers**: `Authorization: Bearer <JWT>`  
  - **Response**: User object details

### 👥 Leads & Scoring (`src/api/leads.js`)
- `GET /leads?page=1&limit=20&status=qualified&priority=high&search=acme`  
  - **Response**: `{ "items": [...], "total": 1482, "page": 1, "limit": 20 }`
- `GET /leads/{id}`  
  - **Response**:  
    ```json
    {
      "id": 1024,
      "name": "Kathryn Murphy",
      "email": "k.murphy@strataworks.com",
      "phone": "+1 (555) 234-5678",
      "company": "StrataWorks Tech",
      "company_size": "500-1000",
      "industry": "Financial Services",
      "source": "Demo Request",
      "score": 91,
      "priority": "HIGH",
      "status": "QUALIFIED",
      "assigned_to": "Aarav Shah",
      "assigned_to_id": 1,
      "created_at": "2026-09-28T10:15:00Z",
      "updated_at": "2026-09-29T14:30:00Z",
      "score_factors": [
        "+20 Enterprise company",
        "+15 Business email",
        "+25 Demo requested"
      ]
    }
    ```
- `POST /leads`  
  - **Body**: Lead payload -> **Response**: Created Lead object
- `PATCH /leads/{id}`  
  - **Body**: `{ "status": "DEMO", "priority": "HIGH" }`
- `DELETE /leads/{id}`  
  - **Response**: `{ "success": true }`
- `POST /leads/{id}/assign`  
  - **Body**: `{ "user_id": 1 }`
- `POST /leads/{id}/convert`  
  - **Response**: Converted Deal object
- `GET /leads/{id}/activity`  
  - **Response**: List of activity timeline objects (`[{ "id": 1, "title": "Lead Created", "timestamp": "...", "actor": "...", "details": "..." }]`)

### 📋 Follow-up Tasks (`src/api/tasks.js`)
- `GET /tasks?status=PENDING`
- `POST /tasks`
- `PATCH /tasks/{id}`
- `DELETE /tasks/{id}`

### 📊 Analytics & Telemetry (`src/api/analytics.js`)
- `GET /analytics/overview` -> `{ "total_leads": 1482, "qualified_leads": 645, "conversion_rate": 20.1, ... }`
- `GET /analytics/leads-over-time` -> `[{ "date": "May 2026", "total": 180, "qualified": 82 }, ...]`
- `GET /analytics/leads-by-source` -> `[{ "name": "Demo Request", "count": 480 }, ...]`
- `GET /analytics/leads-by-status` -> `[{ "name": "Qualified", "count": 645 }, ...]`
- `GET /analytics/salesperson-performance` -> `[{ "name": "Aarav Shah", "assigned": 142, "won": 32 }, ...]`
- `GET /analytics/pipeline` -> `[{ "name": "New", "count": 312 }, ...]`
- `GET /analytics/score-distribution` -> `[{ "range": "81-100", "count": 457 }, ...]`

### 📤 Async CSV Upload & Polling (`src/api/imports.js`)
- `POST /imports/leads`  
  - **Form Data**: `file` (.csv file)  
  - **Response**: `{ "id": "job_101", "status": "PROCESSING", ... }`
- `GET /imports/{id}`  
  - **Response**:  
    ```json
    {
      "id": "job_101",
      "file_name": "leads.csv",
      "status": "PROCESSING",
      "total_rows": 50000,
      "processed_rows": 47821,
      "imported_rows": 45110,
      "duplicate_rows": 1890,
      "invalid_rows": 821,
      "progress_percentage": 95.6,
      "errors": [...]
    }
    ```

### 👤 Team Management (`src/api/users.js`)
- `GET /users`
- `GET /users/{id}`
- `PATCH /users/{id}`

### 🔔 Notifications (`src/api/notifications.js`)
- `GET /notifications`
- `PATCH /notifications/{id}/read`

---

## 🛠️ Switching from Mock Fallback to Live FastAPI Backend

All HTTP network traffic is centralized in `src/api/client.js`. Out of the box, if FastAPI is not yet running on `http://localhost:8000`, the API services provide a clean fallback using isolated data in `src/mock/mockData.js` so you can visually verify all frontend components.

Once your FastAPI backend is running:
1. Ensure your backend is listening at `http://localhost:8000` (or update `VITE_API_URL` in `.env`).
2. You can safely delete the `src/mock/` directory when ready. All API functions in `src/api/*.js` will seamlessly communicate directly with your FastAPI endpoints!
