# SN Infratech Solutions Website

Two-page bilingual React + Vite website for SN Infratech Solutions.

## Local Setup

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/
```

Routes:

- `/` - main website
- `/apply-for-jobs` - job application page

## Google Sheets Form Setup

The website has three forms:

- Contact Us
- Apply Jobs
- Request Employees


```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
```

The Apps Script creates these tabs automatically if they do not exist:

- `Contact Us`
- `Apply Jobs`
- `Request Employees`

Validation rules are applied in both the website and Apps Script:

- Mobile numbers must be exactly 10 digits.
- Name, location, searched role, and job type fields accept letters only.
- Email must be a valid email address.
- Number of employees must be numeric and between 1 and 100.

Restart the dev server after adding `.env`.
