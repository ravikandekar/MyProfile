import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Dimensions, Animated} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = ({navigation}) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.replace('MainTabs');
      });
    }, 2500);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Image
          source={require('../assets/profile.jpg')}
          style={[styles.image, {borderColor: theme.primary}]}
          resizeMode="cover"
        />
        <Animated.Text style={[styles.name, {color: theme.text, opacity: fadeAnim}]}>
          Raviii Kandekar
        </Animated.Text>
        <Animated.Text style={[styles.title, {color: theme.textSecondary, opacity: fadeAnim}]}>
          Senior React Native Developer
        </Animated.Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    borderWidth: 3,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default SplashScreen;
