import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadBackgroundMusic();
    return () => {
      if (backgroundMusic) {
        backgroundMusic.unloadAsync();
      }
    };
  }, []);

  const loadBackgroundMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/[No Copyright Background Music] Spacey Weird Groovy Electronic Beat  Waveform Love by Avanti.mp3'),
        { shouldPlay: false, isLooping: true, volume: 0.3 }
      );
      setBackgroundMusic(sound);
      setIsLoaded(true);
      
      // Start playing if music is enabled
      if (musicEnabled) {
        await sound.playAsync();
      }
    } catch (error) {
      console.log('Error loading background music:', error);
    }
  };

  const toggleMusic = async (enabled) => {
    setMusicEnabled(enabled);
    if (backgroundMusic && isLoaded) {
      try {
        if (enabled) {
          await backgroundMusic.playAsync();
        } else {
          await backgroundMusic.pauseAsync();
        }
      } catch (error) {
        console.log('Error toggling music:', error);
      }
    }
  };

  const value = {
    musicEnabled,
    toggleMusic,
    isLoaded
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};
