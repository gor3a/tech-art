# Tech Art v2

A modern, multilingual React Native application built with Expo that showcases technology articles and insights. The app features a clean, intuitive interface with support for both English and Arabic languages, including RTL (Right-to-Left) text support.

## 🚀 Features

- **Multilingual Support**: Full internationalization with English and Arabic languages
- **RTL Support**: Native right-to-left text support for Arabic content
- **Cross-Platform**: Runs on iOS, Android, and Web
- **Modern UI**: Clean, responsive design with smooth animations
- **Article Management**: Browse, read, and discover technology articles
- **Featured Content**: Highlighted articles on the home screen
- **Navigation**: Intuitive tab-based navigation
- **Responsive Design**: Optimized for tablets and mobile devices

## 📱 Screens

- **Home**: Featured articles and quick navigation
- **Articles**: Complete list of technology articles
- **Article Detail**: Full article reading experience
- **Settings**: Language preferences and app configuration

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router v6 with React Navigation
- **Internationalization**: expo-localization with i18n-js
- **State Management**: React Context API
- **Styling**: React Native StyleSheet
- **Development**: TypeScript support
- **Platform Support**: iOS, Android, Web

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS development: [Xcode](https://developer.apple.com/xcode/)
- For Android development: [Android Studio](https://developer.android.com/studio)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-art-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 🏃‍♂️ Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android device/emulator
- `npm run ios` - Start the app on iOS device/simulator
- `npm run web` - Start the app in web browser

### Development Workflow

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Choose your platform**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web
   - Scan QR code with Expo Go app on your device

3. **Live Reloading**
   The app supports hot reloading, so changes will be reflected immediately during development.

## 🌐 Internationalization

The app supports multiple languages with the following structure:

- **English**: `locales/en.json`
- **Arabic**: `locales/ar.json`

### Adding New Languages

1. Create a new locale file in the `locales/` directory
2. Update the `app.json` configuration
3. Add the language option in the Settings screen

### Article Content

Articles are stored in JSON format:
- **English articles**: `data/articles-en.json`
- **Arabic articles**: `data/articles-ar.json`

## 📁 Project Structure

```
tech-art-v2/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab-based navigation
│   ├── _layout.tsx        # Root layout
│   ├── article-detail.tsx # Article detail screen
│   └── modal.tsx          # Modal screens
├── components/            # Reusable components
├── constants/             # App constants and colors
├── contexts/              # React Context providers
├── data/                  # Static data files
│   ├── articles-en.json   # English articles
│   └── articles-ar.json   # Arabic articles
├── locales/               # Internationalization files
│   ├── en.json           # English translations
│   └── ar.json           # Arabic translations
├── screens/               # Screen components
└── assets/                # Images, fonts, and other assets
```

## 🎨 Customization

### Adding New Articles

1. Edit the appropriate JSON file in the `data/` directory
2. Follow the existing article structure:
   ```json
   {
     "id": "unique-id",
     "title": "Article Title",
     "summary": "Brief summary",
     "content": "Full article content",
     "author": "Author Name",
     "publishDate": "YYYY-MM-DD",
     "category": "Category",
     "readTime": "X min read",
     "featured": true/false
   }
   ```

### Styling

The app uses React Native StyleSheet for styling. Key style files:
- Individual component styles are defined within each component
- Global colors are defined in `constants/Colors.ts`
- The app supports both light and dark themes

## 📱 Platform-Specific Features

### iOS
- Supports tablets with adaptive layouts
- Native iOS navigation patterns
- Optimized for various screen sizes

### Android
- Edge-to-edge display support
- Adaptive icon support
- Material Design principles

### Web
- Static output for optimal performance
- Responsive design for desktop browsers
- Progressive Web App capabilities

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   Update version, name, and other metadata in `app.json`

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

3. **Build for Android**
   ```bash
   expo build:android
   ```

4. **Build for Web**
   ```bash
   expo build:web
   ```

### Publishing Updates

```bash
expo publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Expo Documentation](https://docs.expo.dev/)
2. Review the [React Native Documentation](https://reactnative.dev/docs/getting-started)
3. Open an issue in this repository

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [React Native](https://reactnative.dev/)
- Icons by [Expo Vector Icons](https://icons.expo.fyi/)
- Internationalization with [i18n-js](https://github.com/fnando/i18n-js)