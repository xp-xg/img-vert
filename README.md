# Image Converter

An online image converter tool that allows users to convert images between different formats (PNG, JPEG, WebP, GIF, BMP, etc.) with resizing capabilities.

## Features

- Convert images to multiple formats (PNG, JPEG, WebP, GIF, BMP)
- Resize images while maintaining aspect ratio
- Simple drag-and-drop interface
- Dark/light mode support
- Multi-language support
- Client-side processing (no server upload)

## Technologies Used

- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- i18next (internationalization)
- file-saver (for downloads)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd img-vert
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Environment Variables

None required for local development.

## Deployment

### For Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. The build output will be in the `dist/` directory

3. Deploy the `dist/` directory to your preferred hosting platform (Netlify, Vercel, GitHub Pages, etc.)

### For Firebase Hosting

This application is configured for Firebase Hosting. Follow these steps:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Create a project in the [Firebase Console](https://console.firebase.google.com/)

4. Update your project ID in `.firebaserc`:
   ```json
   {
     "projects": {
       "default": "your-actual-project-id-here"
     }
   }
   ```

5. Build the application:
   ```bash
   npm run build
   ```

6. Deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```

#### Important AdSense Configuration for Firebase

If using AdSense, after deployment, make sure your ads.txt file is accessible at `https://yourdomain.com/ads.txt`. 
Firebase Hosting automatically serves files in the public directory, so the ads.txt file in the public folder will be available at the root.

For detailed instructions, see `FIREBASE_DEPLOYMENT_INSTRUCTIONS.md`.

### Recommended Hosting Platforms

- [Vercel](https://vercel.com) - Zero configuration deployment for Vite applications
- [Netlify](https://netlify.com) - Simple drag-and-drop deployment
- [GitHub Pages](https://pages.github.com) - Free hosting for static sites
- Any traditional web server that can serve static files

### Server Configuration

For proper deployment, ensure your server is configured to:

- Serve `index.html` for client-side routing (if using routing)
- Set proper MIME types for static assets
- Enable compression (Gzip/Brotli) for optimized loading

## Project Structure

```
src/
├── components/     # Reusable UI components
├── App.jsx         # Main application component
├── App.css         # Main styles
└── ...
```

## Image Conversion Process

All image processing happens directly in the browser using Canvas API. No images are uploaded to any server, ensuring privacy.

## Contact Form

The contact form currently uses a mailto: link approach, which opens the user's default email client with pre-filled information.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Production Checklist

Before deploying to production, ensure you have:

- [ ] Tested on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verified responsive design on different screen sizes
- [ ] Optimized images and assets for web delivery
- [ ] Set up analytics (optional)
- [ ] Verified privacy policy and terms of service are accurate
- [ ] Added error logging (optional)
- [ ] Set up SSL/HTTPS
- [ ] Configured proper security headers

## Known Issues

- Large image processing may be slower on lower-end devices
- Some older browsers may not support all image formats

## Support

If you encounter any issues, please open an issue on GitHub.

## License

This project is open source and available under the [MIT License](LICENSE).
# img-vert
