# Habit Tracker PWA

## 📌 Project Overview

This project is a **mobile-first Habit Tracker Progressive Web App (PWA)** built with Nextjs App router

The application allows users to:

* Sign up and log in with email and password
* Create, edit, and delete habits
* Mark habits as complete for the current day
* Track daily streaks based on completion history
* Persist all data locally using `localStorage`
* Install the app as a Progressive Web App
* Load the app shell even when offline

This project focuses on **strict adherence to a Technical Requirements Document (TRD)**, deterministic behavior, and full test coverage.

---

## ⚙️ Tech Stack

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **localStorage (persistence)**
* **Vitest (unit + integration tests)**
* **React Testing Library**
* **Playwright (end-to-end tests)**

---

## 🚀 Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/HAFEEZAH029/habit-tracker.git
cd habit-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npm install -D @playwright/test
npx playwright install
```

---

## ▶️ Run Instructions

### Development

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

### Production Build

```bash
npm run build
npm run start
```

---

## 🧪 Test Instructions

### Run Unit Tests (with coverage)

```bash
npm run test:unit
```

---

### Run Integration Tests

```bash
npm run test:integration
```

---

### Run End-to-End Tests

```bash
npm run test:e2e
```

---

### Run All Tests

```bash
npm run test
```

---

## 💾 Local Persistence Structure

All application data is stored in `localStorage` using deterministic keys:

### 1. Users

Key: `habit-tracker-users`

```json
[
  {
    "id": "string",
    "email": "string",
    "password": "string",
    "createdAt": "string"
  }
]
```

---

### 2. Session

Key: `habit-tracker-session`

```json
{
  "userId": "string",
  "email": "string"
}
```

---

### 3. Habits

Key: `habit-tracker-habits`

```json
[
  {
    "id": "string",
    "userId": "string",
    "name": "string",
    "description": "string",
    "frequency": "daily",
    "createdAt": "string",
    "completions": ["YYYY-MM-DD"]
  }
]
```

---

### 📌 Important Behavior

* Completion is **date-based**, not boolean
* Each day is tracked independently
* Streaks are calculated from consecutive dates
* State persists across reloads

---

## 📱 PWA Implementation

The application supports installation and offline usage through:

### 1. Manifest File

Located at:

```
public/manifest.json
```

Includes:

* App name and short name
* Theme and background colors
* Icons (192px and 512px)
* Standalone display mode

---

### 2. Service Worker

Located at:

```
public/sw.js
```

Responsibilities:

* Caches core application routes (`/`, `/login`, `/signup`, `/dashboard`)
* Intercepts network requests
* Serves cached content when offline

---

### 3. Service Worker Registration

Implemented via a client-side component:

```
src/components/shared/ServiceWorker.tsx
```

* Registers service worker on app load
* Enables offline functionality after first visit

---

## ⚖️ Trade-offs & Limitations

### 1. Local Storage Instead of Backend

* No real authentication (client-side only)
* Not suitable for multi-device syncing
* Chosen to comply with TRD requirements

---

### 2. Email-Based User Identity

* No explicit user name field
* Display name derived from email prefix

---

### 3. Basic Caching Strategy

* Caches only app shell (not dynamic updates)
* No advanced cache invalidation
* Sufficient for offline requirement

---

### 4. No Background Sync

* Offline actions are not queued
* User must reconnect for updates

---

## 🧪 Test Coverage & Mapping

This project includes **unit, integration, and end-to-end tests** that directly map to the TRD requirements.

---

### 📁 Unit Tests

#### `tests/unit/slug.test.ts`

Verifies:

* slug generation format
* trimming and normalization
* removal of invalid characters

---

#### `tests/unit/validators.test.ts`

Verifies:

* required habit name validation
* maximum length constraint
* trimmed valid values

---

#### `tests/unit/streaks.test.ts`

Verifies:

* correct streak calculation logic
* handling of missing days
* duplicate date handling

---

#### `tests/unit/habits.test.ts`

Verifies:

* toggle behavior (add/remove completion)
* immutability of habit objects
* prevention of duplicate dates

---

### 📁 Integration Tests

#### `tests/integration/auth-flow.test.tsx`

Verifies:

* signup creates user and session
* duplicate signup rejection
* login success flow
* invalid login handling

---

#### `tests/integration/habit-form.test.tsx`

Verifies:

* form validation behavior
* habit creation and rendering
* editing preserves immutable fields
* deletion requires confirmation
* completion updates streak UI

---

### 📁 End-to-End Tests

#### `tests/e2e/app.spec.ts`

Verifies:

* splash screen behavior and redirects
* authentication flows
* route protection
* habit creation and interaction
* persistence after reload
* logout behavior
* offline app shell loading

---

## ✅ Final Notes

* All required test titles match the TRD exactly
* All required routes, behaviors, and UI contracts are implemented
* The application is fully functional, testable, and PWA-compliant
