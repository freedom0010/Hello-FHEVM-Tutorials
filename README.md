# Hello FHEVM Tutorials

A modern FHEVM (Fully Homomorphic Encryption Virtual Machine) learning platform that helps developers master privacy computing smart contract development from basics to practice.

## 🚀 Project Features

- **Modern Design**: Built with Next.js + TypeScript + Tailwind CSS
- **Responsive Layout**: Perfect adaptation for desktop and mobile
- **Interactive Learning**: Rich interactive components and animation effects
- **Code Highlighting**: Support for code copying and syntax highlighting
- **Progress Tracking**: Visual learning progress display
- **Static Deployment**: Support for static export, deployable to any static hosting platform

## 📁 Project Structure

```
Hello-FHEVM-Tutorials/
├── components/           # Reusable components
│   ├── Layout.tsx       # Page layout component
│   ├── CopyButton.tsx   # Code copy button
│   ├── InteractiveButton.tsx  # Interactive button
│   ├── ProgressBar.tsx  # Progress bar component
│   ├── CourseNavigation.tsx   # Course navigation
│   ├── LoadingSpinner.tsx     # Loading animation
│   └── Toast.tsx        # Message notification component
├── pages/               # Page files
│   ├── index.tsx        # Homepage
│   └── courses/         # Course pages
│       └── [slug].tsx   # Dynamic course page
├── public/              # Static resources
│   └── content/         # Course content
│       └── courses/     # Course markdown files
├── styles/              # Style files
│   └── globals.css      # Global styles
└── ...configuration files
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown + remark-gfm
- **Deployment**: Static export support

## 📦 Installation and Running

### 1. Clone the project
```bash
git clone https://github.com/your-username/Hello-FHEVM-Tutorials.git
cd Hello-FHEVM-Tutorials
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode
```bash
npm run dev
```

Visit http://localhost:3000 to view the project

### 4. Build production version
```bash
npm run build
```

### 5. Static export
```bash
npm run export
```

## 🎨 Component Description

### Layout Component
- Unified page layout
- Responsive navigation bar
- Mobile menu support

### InteractiveButton Component
- Multiple style variants (primary, secondary, outline, ghost)
- Multiple sizes (sm, md, lg)
- Loading state support
- Press animation effects

### CopyButton Component
- One-click code copy functionality
- Copy status feedback
- Fallback solution support

### ProgressBar Component
- Visual progress display
- Custom style support
- Animation transition effects

## 📝 Course Content Management

Course content is stored in the `public/content/courses/` directory, using Markdown format:

```
01-introduction.md
02-environment-setup.md
03-writing-contract.md
04-deploy-contract.md
05-encryption-decryption.md
06-frontend.md
07-conclusion.md
```

### Adding New Courses
1. Create a new `.md` file in the corresponding directory
2. Update the `courseList` array in `pages/courses/[slug].tsx`
3. Rebuild the project

## 🎯 Core Features

### 1. Homepage
- Hero section display
- Course introduction
- Learning path display
- Interactive step cards

### 2. Course Pages
- Markdown content rendering
- Code syntax highlighting
- Code copy functionality
- Course navigation
- Progress tracking

### 3. Responsive Design
- Mobile optimization
- Touch-friendly interactions
- Adaptive layout

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Automatic deployment, no additional configuration needed

### Netlify Deployment
1. Connect GitHub repository to Netlify
2. Build command: `npm run build && npm run export`
3. Publish directory: `out`

### GitHub Pages Deployment
1. Run `npm run build && npm run export`
2. Push `out` directory contents to `gh-pages` branch

## 🔧 Custom Configuration

### Theme Colors
Modify theme colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* Primary color configuration */ },
      secondary: { /* Secondary color configuration */ }
    }
  }
}
```

### Style Customization
Add custom styles in `styles/globals.css`.

## 📱 Browser Support

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

## 🤝 Contributing Guidelines

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [Heroicons](https://heroicons.com/) - Icon library

## 📞 Contact

If you have questions or suggestions, please contact us through:

- Create an Issue
- Send a Pull Request
- Email: your-email@example.com

---

**Start Your FHEVM Learning Journey!** 🚀

## 🔗 Live Demo

- **Live Site**: [https://your-vercel-app.vercel.app](https://your-vercel-app.vercel.app)
- **GitHub Repository**: [https://github.com/your-username/Hello-FHEVM-Tutorials](https://github.com/your-username/Hello-FHEVM-Tutorials)

## 📋 Deployment Checklist

- [x] Project optimized and fully English
- [x] All 7 course pages generated successfully
- [x] Build passes without errors
- [x] Static export ready
- [ ] GitHub repository created
- [ ] Vercel deployment configured