# Metal Tek BD — Admin Login Portal

A sleek, modern, zero-dependency Admin Login Interface designed for **Metal Tek BD**, optimized for immediate zero-error static deployment on **Vercel** via GitHub.

---

## ⚡ Highlights & Architecture

- **Zero Build Dependencies**: Pure HTML5 + Tailwind CSS via CDN + Lucide Icons. No `npm install`, no `node_modules`, no bundler configuration required.
- **Immediate Vercel Compatibility**: Configured with `vercel.json` for instant deployment, clean URLs, and HTTP security headers.
- **Minimalist Industrial Aesthetic**: Dark metallic palette (`#070D1E`), floating card layout, brand tricolor accent bar, and zero clutter.
- **Anti-Autofill Protection**: Uses hidden decoy inputs and non-standard field names to divert aggressive browser password managers.
- **Future Supabase Integration**: Modular JavaScript architecture with a dedicated, commented `handleAdminLogin` slot for Supabase Auth.

---

## 📁 Project Structure

```
├── index.html        # Complete Admin Login interface & client logic
├── vercel.json       # Vercel static routing & HTTP security headers
└── README.md         # Documentation & deployment guide
```

---

## 🚀 Running Locally

You can test this project immediately on your local machine using any simple static file server:

### Option 1: Python (Built-in)
```bash
# Python 3
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Node.js (npx)
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🔑 Default Sandbox Credentials (Testing Mode)

Until you connect Supabase, the built-in mock authentication accepts:

| Field | Accepted Value |
| :--- | :--- |
| **Username / Email** | `admin@metaltekbd.com` _or_ `admin` |
| **Password** | `MetalTek@2026` _or_ `admin123` |

---

## 🌐 Instant Deployment to Vercel via GitHub

1. **Create a new GitHub repository** (e.g. `metaltek-admin-portal`).
2. **Push the files**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial admin login portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/metaltek-admin-portal.git
   git push -u origin main
   ```
3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository.
   - **Framework Preset**: Choose **"Other"**.
   - **Build Command**: Leave **empty**.
   - **Output Directory**: Leave **empty** (or `./`).
   - Click **"Deploy"**.
4. Your admin portal will be live in ~10 seconds with **zero build errors**.

---

## 🔌 Connecting Supabase Authentication

When you are ready to connect your production Supabase database:

### Step 1: Enable Supabase Client in `index.html`
Uncomment the Supabase CDN script inside the `<head>` of `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### Step 2: Configure Supabase Credentials
Inside `<script>` in `index.html`, add your project URL and public Anon Key:
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_PUBLIC_ANON_KEY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Step 3: Update `handleAdminLogin`
Replace the mock function in `index.html` with real Supabase Auth:
```javascript
async function handleAdminLogin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
    user: data.user,
    session: data.session
  };
}
```

---

## 🛡️ License & Copyright
&copy; 2026 Metal Tek BD. All rights reserved.
