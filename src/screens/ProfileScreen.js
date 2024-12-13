import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const ProfileScreen = () => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const stats = [
    {icon: 'code-braces', label: 'Projects', value: '15+'},
    {icon: 'briefcase', label: 'Experience', value: '3 Years'},
    {icon: 'lightning-bolt', label: 'Skills', value: '20+'},
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.profileContainer,
            {
              backgroundColor: theme.surface,
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.profileImage}
            />
          </View>
          <Text style={[styles.name, {color: theme.text}]}>John Doe</Text>
          <Text style={[styles.title, {color: theme.textSecondary}]}>
            Senior Software Developer
          </Text>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <MaterialCommunityIcons
                  name={stat.icon}
                  size={24}
                  color={theme.primary}
                  style={styles.statIcon}
                />
                <Text style={[styles.statValue, {color: theme.text}]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, {color: theme.textSecondary}]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.bioContainer}>
            <Text style={[styles.bioText, {color: theme.text}]}>
              Passionate software developer with expertise in React Native, React.js,
              and Node.js. Committed to creating elegant solutions and delivering
              exceptional user experiences.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  profileContainer: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  bioContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ProfileScreen;
