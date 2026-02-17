import React from 'react';
<<<<<<< HEAD
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
=======
import { NavigationContainer } from '@react-navigation/native';
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import StartMenuScreen from './src/screens/StartMenuScreen';
import AppSelectionScreen from './src/screens/AppSelectionScreen';
import DifficultyScreen from './src/screens/DifficultyScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
<<<<<<< HEAD
import MultiplayerMenuScreen from './src/screens/MultiplayerMenuScreen';
import MultiplayerLobbyScreen from './src/screens/MultiplayerLobbyScreen';
import MultiplayerQuizScreen from './src/screens/MultiplayerQuizScreen';
import MultiplayerResultScreen from './src/screens/MultiplayerResultScreen';
import { MusicProvider } from './src/contexts/MusicContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { MultiplayerProvider } from './src/contexts/MultiplayerContext';
import AnimatedBackground from './src/components/AnimatedBackground';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    card: 'transparent',
  },
};
=======
import { MusicProvider } from './src/contexts/MusicContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <MusicProvider>
<<<<<<< HEAD
        <MultiplayerProvider>
          <AnimatedBackground>
            <NavigationContainer theme={navigationTheme}>
              <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right'
                }}
              >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="StartMenu" component={StartMenuScreen} />
                <Stack.Screen name="AppSelection" component={AppSelectionScreen} />
                <Stack.Screen name="Difficulty" component={DifficultyScreen} />
                <Stack.Screen name="Quiz" component={QuizScreen} />
                <Stack.Screen name="Result" component={ResultScreen} />
                <Stack.Screen name="Options" component={OptionsScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="MultiplayerMenu" component={MultiplayerMenuScreen} />
                <Stack.Screen name="MultiplayerLobby" component={MultiplayerLobbyScreen} />
                <Stack.Screen name="MultiplayerQuiz" component={MultiplayerQuizScreen} />
                <Stack.Screen name="MultiplayerResult" component={MultiplayerResultScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </AnimatedBackground>
        </MultiplayerProvider>
=======
        <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="StartMenu" component={StartMenuScreen} />
          <Stack.Screen name="AppSelection" component={AppSelectionScreen} />
          <Stack.Screen name="Difficulty" component={DifficultyScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Options" component={OptionsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
        </NavigationContainer>
>>>>>>> df4fd4376f775ff067a6ef744ffe13c1667e16bd
      </MusicProvider>
    </LanguageProvider>
  );
}

