# HMS Pro - Login Form Capstone

A modern frontend login form built as part of the FlyRank frontend AI engineering capstone. The project focuses on form validation, accessibility, UX, and security-conscious frontend patterns.

## Overview

This project demonstrates how to build a production-quality login form with:

- real-time validation
- password strength indicators
- accessibility features for keyboard and screen-reader users
- clean mobile-first styling
- polished success/error feedback

## Features

- Email validation with inline feedback
- Password strength meter
- Minimum password length enforcement
- Show/hide password toggle
- Remember me functionality using `localStorage`
- Loading state while submitting
- Responsive mobile-first layout
- A11y improvements such as focus states, labels, and semantic HTML

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Accessibility-first frontend design

## Project Structure

```text
flyrank-frontend-capstone/
├── index.html
├── styles.css
├── app.js
├── README.md
├── WORKFLOW.md
└── assets/
```

## Getting Started

1. Clone the project:

```bash
git clone https://github.com/sikandarali64/flyrank-frontend-capstone.git
cd flyrank-frontend-capstone
```

2. Open the app locally:

```bash
python -m http.server 8000
```

3. Visit:

```text
http://localhost:8000
```

## Demo Credentials

For testing purposes:

```text
Email: admin@hospital.com
Password: Admin@123
```

## Accessibility Notes

The form includes:

- associated labels for inputs
- proper `aria` attributes where needed
- visible focus states
- reduced-motion support
- screen-reader-friendly validation messages

## Validation Behavior

- Email must follow a valid format
- Password must be at least 8 characters
- Stronger passwords receive stronger UI feedback
- Invalid inputs show clear inline errors

## Browser Support

- Chrome
- Firefox
- Edge
- Safari

## Notes

This is a frontend-only project and is meant to demonstrate UI/UX quality rather than a complete backend authentication system.

## License

MIT

## Author

Sikandar Ali - https://github.com/sikandarali64
