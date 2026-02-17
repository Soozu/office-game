import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function AnimatedBackground({ children }) {
  const colorAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const colorLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 7000,
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 7000,
          useNativeDriver: false,
        }),
      ])
    );

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    colorLoop.start();
    floatLoop.start();

    return () => {
      colorLoop.stop();
      floatLoop.stop();
    };
  }, [colorAnim, floatAnim]);

  const animatedBackground = {
    backgroundColor: colorAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['#0f172a', '#1f3b73', '#0f172a'],
    }),
  };

  const floatingTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.baseLayer, animatedBackground]} />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.accentBlob,
          {
            transform: [{ translateY: floatingTranslate }],
          },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.accentBlobSecondary,
          {
            transform: [{ translateY: Animated.multiply(floatingTranslate, -1) }],
          },
        ]}
      />
      <View style={styles.noiseOverlay} pointerEvents="none" />
      <View style={styles.content} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  baseLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  accentBlob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 200,
    backgroundColor: 'rgba(74,144,226,0.35)',
    top: -40,
    right: -80,
    opacity: 0.8,
  },
  accentBlobSecondary: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 200,
    backgroundColor: 'rgba(155,89,182,0.35)',
    bottom: -60,
    left: -60,
    opacity: 0.8,
  },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
  },
});


