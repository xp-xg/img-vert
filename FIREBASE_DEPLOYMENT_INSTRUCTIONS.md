# Firebase Deployment Instructions for Image Converter

## Prerequisites

1. A Google account to create a Firebase project
2. Firebase CLI installed globally (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

## Step-by-Step Deployment

### 1. Login to Firebase
```bash
firebase login
```

### 2. Create a Firebase project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the prompts to create your project
4. Note down your project ID

### 3. Update the configuration
Replace `your-firebase-project-id` in `.firebaserc` with your actual project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id-here"
  }
}
```

### 4. Build the application
The production build will be created in the `dist/` folder:
```bash
npm run build
```

### 5. Deploy to Firebase
```bash
firebase deploy --only hosting
```

## Configuration Files

We've already created:
- `firebase.json` - Configures hosting settings
- `.firebaserc` - Associates the project ID

The `firebase.json` is configured to:
- Serve files from the `dist` folder (where the build output goes)
- Handle client-side routing (SPA rewrites)
- Ignore development files

## Troubleshooting

If you encounter issues:

1. **Build fails**: Make sure Node.js and npm are properly installed and compatible with the project dependencies.

2. **Firebase login fails**: Try `firebase login --reauth` or use `firebase login --no-localhost` if behind a firewall.

3. **Deployment fails**: Check that your project ID is correct in `.firebaserc` and that you have proper permissions.

4. **Missing dist folder**: Make sure the build command (`npm run build`) completes successfully.

## Verification

After deployment, Firebase will provide a URL where your application is hosted. You can also manage your deployment from the Firebase Console.