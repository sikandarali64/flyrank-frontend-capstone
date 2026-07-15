# Flyrank Frontend Capstone

Frontend AI Engineering track capstone project.

## Tech Stack
- React
- Tailwind CSS
- Node.js
- Claude AI

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
npm run dev
```

---

# HMS Pro - Login Form

A modern, accessible login form for Hospital Management System Pro.

## Features

### Form Validation
- Real-time email validation with regex pattern
- Password strength indicator (weak/fair/good/strong)
- Minimum password length enforcement (8 characters)
- Inline error messages with ARIA support

### Accessibility (WCAG 2.1 AA)
- Proper label associations
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus visible indicators
- Reduced motion support

### User Experience
- Show/hide password toggle
- Remember me functionality (localStorage)
- Loading state during submission
- Success/error alerts with animations
- Responsive design (mobile-first)

### Security Considerations
- No sensitive data in localStorage
- Form validation on client and server
- CSRF protection ready
- Rate limiting ready

## Demo Credentials

For testing purposes:
- **Email:** admin@hospital.com
- **Password:** Admin@123

## File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # All styling with CSS variables
├── app.js          # Form logic and validation
├── README.md       # Documentation
└── WORKFLOW.md     # Lazy vs Precise Prompting Exercise
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Running Locally
1. Open `index.html` in your browser
2. No build step required

### Code Quality
- ESLint compatible
- Prettier formatting
- JSDoc comments

## Round 2 Improvements (vs Round 1)

| Feature | Round 1 (Lazy) | Round 2 (Precise) |
|---------|----------------|-------------------|
| Validation | ❌ None | ✅ Full client-side |
| Error Handling | ❌ None | ✅ Comprehensive |
| Accessibility | ❌ Basic | ✅ WCAG 2.1 AA |
| Password Strength | ❌ None | ✅ Visual indicator |
| Loading States | ❌ None | ✅ Spinner + disabled |
| Remember Me | ⚠️ Basic | ✅ localStorage |
| Responsive | ⚠️ Basic | ✅ Mobile-first |
| Code Quality | ❌ Minimal | ✅ Well-documented |

## Branches

- `main` - Main branch with project documentation
- `fe-03-round1-lazy` - Round 1: Lazy prompt output
- `fe-03-round2-precise` - Round 2: Precise prompt output

## Documentation

- [WORKFLOW.md](./WORKFLOW.md) - Lazy vs Precise Prompting Exercise