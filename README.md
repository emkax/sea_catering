# Sea Catering – Subscription & Customization Web App 🌊🍽️

A **full-stack web application** for managing catering service subscriptions and meal customizations. Built using **Next.js (App Router)** and **Supabase** for backend and database management.

This platform allows customers to easily subscribe to meal plans, customize their food preferences, and manage their catering needs—all in one streamlined, responsive web interface.

---

## 🚀 Features

- ✅ **Authentication** – Secure login & sign-up using Supabase Auth  
- 📅 **Subscription Management** – Users can subscribe, view, and modify their catering plans  
- 🧾 **Menu Customization** – Tailor meals to suit preferences (dietary needs, exclusions, portions, etc.)  
- 📦 **Order Tracking** – View upcoming and past deliveries *(in development)*  
- ⚙️ **Admin Panel (WIP)** – Manage users, menus, and subscription statuses  
- 🎨 **Responsive UI** – Designed for both desktop and mobile using modern CSS styling  

---

## 🛠 Tech Stack

| Frontend           | Backend & DB                | Deployment |
|--------------------|-----------------------------|------------|
| Next.js (App Dir)  | Supabase (PostgreSQL)       | Vercel     |


---

## 🌐 Live Demo

**Deploy on Vercel:**  
🔗 [Live Link]()  

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```
git clone https://github.com/yourusername/seacatering.git
cd seacatering
```
### 2. Install Dependencies
```
npm install
```
### 3. Set up environment variables
create a `.env.local` file in the root directory with the following:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally
```
npm run dev
```
