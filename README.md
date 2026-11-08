<div align="center">

# 🛒 বাজার দর | BazarDor

### প্রয়োজনীয় পণ্যের দাম এক নজরে।

A Bangla daily market price tracker, built with Next.js, Tailwind CSS and Better Auth.

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-111827?style=for-the-badge)



</div>

---

##  About the Project

**বাজার দর (BazarDor)** helps people in Bangladesh quickly check the daily prices of everyday essentials such as rice, pulses, oil, vegetables, fish, meat and eggs. Prices are shown in Bengali digits, with a clear indicator of whether each price went up ▲, down ▼ or stayed the same today.

Users can browse products by category, see which items got more expensive or cheaper today, and sign in to view a detailed, market-wise price breakdown for each product.

---

##  Key Features

1. ** Live Price Ticker & Daily Movers**
   An infinitely scrolling marquee shows each product's emoji, name, price and ▲/▼ percentage change. The home page highlights the **top 6 price risers** and **top 6 fallers** of the day, plus a full **"সব পণ্য"** grid.

2. **  Category Browsing with Sorting**
   Dedicated category pages (e.g. চাল, সবজি, মাছ) with a **sort dropdown**: Default, Price low → high, Price high → low. Sorting works on the real numeric value, even for Bengali numerals. Skeleton loaders appear while data loads.

3. ** Authentication with Better Auth**
   Email/password sign-up and sign-in, plus **Google** and **GitHub** social login. Toast notifications give feedback for login, signup, logout and validation errors.

4. ** Protected Product Details Page**
   `/products/[slug]` requires login. It shows the product summary, category tags, unit, **minimum / maximum / average price** and market-wise prices from different bazaars.

5. ** Profile & Update Information**
   A My Profile page shows the user's details, and an update page lets users change their name using Better Auth's update-user API.

**Also included:** fully responsive layout (mobile, tablet, desktop), a friendly custom **404 page** with a "হোম পেজে ফিরে যান" button, Bangla date in the navbar and a smooth-scroll hero CTA.

---

##  Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) (App Router) | Framework, routing, dynamic `[slug]` routes |
| [React](https://react.dev/) | UI components |
| [Tailwind CSS](https://tailwindcss.com/) + DaisyUI | Styling and responsiveness |
| [Better Auth](https://better-auth.com/) | Authentication (Email/Password, Google, GitHub) |
| [MongoDB](https://www.mongodb.com/) | Database for users and sessions |
| [react-fast-marquee](https://www.npmjs.com/package/react-fast-marquee) | Price ticker animation |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| [Netlify](https://www.netlify.com/) | Deployment |

---

##  Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── profile/        # My Profile + update info
│   │   ├── signin/         # Sign in page
│   │   └── signup/         # Sign up page
│   ├── api/auth/[...all]/  # Better Auth route handler
│   ├── category/[slug]/    # Category pages
│   ├── products/[slug]/    # Protected product details
│   ├── layout.js
│   ├── not-found.jsx       # Custom 404
│   └── page.js             # Home page
├── components/             # Navbar, Marquee, ProductCard, Footer, ...
└── lib/                    # auth, auth-client, products data helpers
```

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/bazardor.git
cd bazardor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> Adjust the variable names to match the ones used in `src/lib/auth.jsx`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Deployment

The project is deployed on **vercel**. Dynamic routes (`/category/[slug]`, `/products/[slug]`) work on refresh without a hard 404. Remember to add all environment variables in your hosting dashboard and set the OAuth callback URLs to your live domain.

---

##  Disclaimer

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
*All prices are approximate and may change depending on market conditions.*

---

<div align="center">

Made with ❤️ by **<Abdullah Khan>**

</div>