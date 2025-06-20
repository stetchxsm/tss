# Dr White Group Website

## About Dr White Group

Dr White Group is a leading multi-service company specializing in:

### 🛫 Travel Services
- Flight bookings to Gulf countries
- Comprehensive Hajj & Umrah packages
- Visa assistance and travel insurance
- Group travel arrangements

### 🎓 Education Consulting
- Study abroad guidance for Central Asian countries
- University application assistance
- Scholarship guidance and visa support
- Pre-departure orientation and ongoing student support

### 🚢 Import/Export Consulting
- Export planning and documentation for Egyptian fruits
- Quality monitoring and market analysis
- Business partnerships facilitation
- Shipping and customs clearance

## Project Features

### 🌐 Multi-language Support
- **Arabic (RTL)** - Full right-to-left support
- **English (LTR)** - Left-to-right layout
- Dynamic language switching with persistent preferences

### 🎨 Modern Design
- Professional business-focused design
- Responsive layout for all devices
- Smooth animations and transitions
- Accessibility-compliant components

### 🛠️ Technical Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with RTL support
- **shadcn/ui** for consistent UI components
- **react-i18next** for internationalization
- **Lucide React** for icons

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd drwhite-group

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ServicesSection.tsx
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── locales/            # Translation files
│   ├── en/            # English translations
│   └── ar/            # Arabic translations
└── ...

public/
├── drwhite-logo.svg    # Company logo
└── ...
```

## Internationalization

The website supports both Arabic and English with:
- RTL (Right-to-Left) layout for Arabic
- LTR (Left-to-Right) layout for English
- Automatic language detection
- Persistent language preferences

### Adding Translations

1. Add new keys to `locales/en/translation.json`
2. Add corresponding Arabic translations to `locales/ar/translation.json`
3. Use in components with `const { t } = useTranslation()`

## Deployment

The project can be deployed to any static hosting service:

- **Netlify** (recommended)
- **Vercel**
- **GitHub Pages**
- **AWS S3 + CloudFront**

Build the project with `npm run build` and deploy the `dist` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2024 Dr White Group. All rights reserved.
