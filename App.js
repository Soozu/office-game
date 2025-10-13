import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import StartMenuScreen from './src/screens/StartMenuScreen';
import AppSelectionScreen from './src/screens/AppSelectionScreen';
import DifficultyScreen from './src/screens/DifficultyScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { MusicProvider } from './src/contexts/MusicContext';
import { LanguageProvider } from './src/contexts/LanguageContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <MusicProvider>
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
      </MusicProvider>
    </LanguageProvider>
  );
}

