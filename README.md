# Sneaker Drops Backend & Frontend Documentation

This project is a complete sneaker drop platform. It supports instant and scheduled sneaker drops, real-time stock updates, and robust row-level locking to prevent overselling. The system leverages modern technologies for both backend and frontend, integrating **real-time sockets, job queues, and modern state management**.

---

## How to Run the App with SQL Schema Setup

Steps to run the app discussed briefly and given detailed commands below this section.

1. **Backend SQL schema setup and start**
   - Clone the backend repository and install dependencies.
   - Configure `.env` with PostgreSQL and Redis values.
   - Run `npm run migrate:up` to create the SQL schema via migrations.
   - Run `npm run seed:up` to populate initial data, then `npm run dev` to start the backend.

2. **Frontend start**
   - Clone the frontend repository and install dependencies.
   - Run `npm run dev` in the frontend folder.
   - Open the shown URL in your browser to use the application.

---

## 60-Second Expiration Logic

Implemented 60 seconds expiration logic using BullMQ and Redis.

- When a user reserves an item, the backend creates a reservation.
- Then, it createss a delayed BullMQ job with 60 seconds delay.
- When the job runs, it checks if the reservation is still completed or not.
- If not confirmed, the job make the reservation as expired and increase the stock count and emit the event for real time update.

---

## Prevent Multiple Users from Claiming the Same Last Item

Using database row locking to prevent overselling.

- Using transaction to lock the row so that until transaction commit other get loading.
- It decrements available_stock only if the current value is greater than zero and emit the event for real time stock update.
- As stock is decremented when two users try reserve last item, one user can reserve the last item and the other user sees zero in stock immediately.

---

## Overview

- **Backend**: Node.js, Express, BullMQ (job queue), Redis (queue), PostgreSQL, Zod (validation).
- **Frontend**: React, Vite, Zustand (state), TailwindCSS, Shadcn/UI.
- **Real-time**: Socket.io for instant updates (like stock changes).
- **Repository Links**:
  - [Backend Repository](https://github.com/asif-iqbal-munna/sneaker-drops-api)
  - [Frontend Repository](https://github.com/asif-iqbal-munna/sneaker-drops-app)

---

## Features

- **Instant & scheduled sneaker drops**
- **Real-time stock update notifications**
- **Table row locking for safe concurrent reservations**

---

## Installation & Setup

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/asif-iqbal-munna/sneaker-drops-api.git
   cd sneaker-drops-api
   ```

2. **Environment Variables**

   Add a `.env` file with the following keys (replace with your actual credentials):

   ```env
   PGHOST=*********
   PGDATABASE=*********
   PGUSER=*********
   PGPASSWORD=*********
   PGSSLMODE=*********
   PGCHANNELBINDING=*********
   DATABASE_URL=*********
   REDIS_URL=*********
   ```

3. **Install Backend Dependencies**

   ```bash
   npm install
   ```

4. **Database Migrations**

   - **Run Migrations**
     ```bash
     npm run migrate:up
     ```
   - **Undo Migrations**
     ```bash
     npm run migrate:down
     ```

5. **Seed Initial Data**

   ```bash
   npm run seed:up
   ```

6. **Start the Server**

   ```bash
   npm run dev
   ```

   The backend should now be running at [http://localhost:4000](http://localhost:4000) (unless changed in your env).

---

### Frontend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/asif-iqbal-munna/sneaker-drops-app.git
   cd sneaker-drops-app
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend App**

   ```bash
   npm run dev
   ```

   You can now access the app, interact with drops, and see real-time updates.

---

## Common Use Cases

- **Create a Sneaker Drop** (immediate or scheduled)
- **Reserve or purchase sneakers (with oversell protection)**
- **Observe real-time updates as stock changes**

---

## Drop API: Creating a Drop

To create a new drop, send a POST request to:

```
POST http://localhost:4000/api/v1/drops
```

**Required Fields**:
- `name` (string): Name of the sneaker
- `price` (number): Price of the sneaker
- `total_stock` (number): Total available stock

**Optional**:
- `drops_date` (ISO string): If omitted, the drop is live immediately. If provided, drop is scheduled via BullMQ and Redis queue.

**Example Request:**
```json
{
  "name": "Puma",
  "price": "69",
  "total_stock": 10
}
```

### Drop Interface

```ts
export interface IDrops {
  id?: number;
  uuid?: string;
  name: string;
  price: number;
  total_stock: number;
  available_stock: number;
  drops_date?: Date | null;
  status: "draft" | "scheduled" | "live" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

## How Scheduled Drops Work

- **Immediate Drops**: No `drops_date` supplied – drop is broadcast to all connected clients via socket.io as soon as it is created.
- **Scheduled Drops**: `drops_date` supplied (must be ISO format with date & time) – drop is scheduled using BullMQ and Redis, then broadcast at the scheduled time.

---

## Real-time Stock Updates

- All connected clients receive instant stock changes thanks to socket.io.
- As users reserve or purchase sneakers, the available stock is updated in real-time everywhere.

---

## Concurrency & Row Locking

- When users reserve a drop, the backend uses row-level locking in the database to prevent oversell.
- This ensures every reservation is safe, even if many users attempt to reserve at the same time.



---

## Frontend Usage

- **Clone** and **install** as above.
- Run the app and interact with sneaker drops.
- You can observe real-time updates, reserve/purchase sneakers, and see stock changes instantly.

---

## Technologies Used

| Area         | Tech Stack                                      |
|--------------|-------------------------------------------------|
| Backend      | Node.js, Express, BullMQ, Redis, PostgreSQL, Zod |
| Frontend     | React, Vite, Zustand, TailwindCSS, Shadcn/UI     |
| Real-time    | Socket.io                                       |
| Validation   | Zod                                             |
| State Mgmt   | Zustand                                         |


---

## Feedback & Contribution

Your feedback and contributions are highly appreciated! Test the platform, create drops, make reservations, and observe the real-time updates.

---

**Happy Sneaker Dropping!** 👟