# Office Quiz Game

An educational quiz game to learn Microsoft Office applications (MS Word, PowerPoint, Excel) while playing!

## Features

- 🎮 Interactive quiz game interface
- 📚 Three applications: MS Word, PowerPoint, and Excel
- 🎯 Three difficulty levels: Easy, Medium, and Hard
- 🏆 Scoring system with points
- 📊 Results and performance tracking
- 🌟 Beautiful and modern UI

## Tech Stack

- React Native
- Expo
- React Navigation
- AsyncStorage

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- Scan the QR code with Expo Go app (Android/iOS)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

## Game Flow

1. **Splash Screen** - Logo and game name appear
2. **Application Selection** - Choose an application (MS Word, PPT, Excel)
3. **Difficulty Selection** - Choose difficulty level (Easy, Medium, Hard)
4. **Quiz Screen** - Answer questions and earn points
5. **Result Screen** - View your score and performance

## Project Structure

```
game/
├── src/
│   ├── screens/
│   │   ├── SplashScreen.js
│   │   ├── AppSelectionScreen.js
│   │   ├── DifficultyScreen.js
│   │   ├── QuizScreen.js
│   │   └── ResultScreen.js
│   └── data/
│       └── questions.js
├── App.js
├── package.json
└── README.md
```

## Adding More Questions

Edit `src/data/questions.js` to add more questions for each application and difficulty level.

## License

MIT

