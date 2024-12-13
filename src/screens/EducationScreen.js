import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EducationCard = ({education, index, animationDelay}) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: index * animationDelay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: index * animationDelay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index, animationDelay]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons
          name="school"
          size={24}
          color={theme.primary}
          style={styles.icon}
        />
        <View style={styles.headerText}>
          <Text style={[styles.degree, {color: theme.text}]}>
            {education.degree}
          </Text>
          <Text style={[styles.school, {color: theme.textSecondary}]}>
            {education.school}
          </Text>
        </View>
        <Text style={[styles.year, {color: theme.textSecondary}]}>
          {education.year}
        </Text>
      </View>
      <Text style={[styles.description, {color: theme.text}]}>
        {education.description}
      </Text>
      {education.achievements && (
        <View style={styles.achievementsContainer}>
          <Text style={[styles.achievementsTitle, {color: theme.primary}]}>
            Key Achievements:
          </Text>
          {education.achievements.map((achievement, idx) => (
            <View key={idx} style={styles.achievementItem}>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color={theme.primary}
                style={styles.checkIcon}
              />
              <Text style={[styles.achievementText, {color: theme.text}]}>
                {achievement}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const EducationScreen = () => {
  const theme = useTheme();
  const educationData = [
    {
      degree: 'Master of Computer Science',
      school: 'Pune University',
      year: '2020-2023',
      description:
        'Specialized in Master of Computer Application .',
      achievements: [
        
        'Graduated with Distinction',
        'Teaching Assistant for Advanced Algorithms',
      ],
    },
    {
      degree: 'Bachelor of Compiuter Science',  
      school: 'Pun University',
      year: '2017-2020',
      description:
        'BCA (Bachelor of Computer Applications) in Science focuses on integrating computer science principles with applications in scientific domains, preparing students for technology-driven careers..',
      achievements: [
        "Dean's List for all semesters",
        'Led the university programming team',
 
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {educationData.map((education, index) => (
          <EducationCard
            key={index}
            education={education}
            index={index}
            animationDelay={300}
          />
        ))}
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
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  degree: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  school: {
    fontSize: 16,
  },
  year: {
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  achievementsContainer: {
    marginTop: 8,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 8,
  },
  achievementText: {
    fontSize: 14,
    flex: 1,
  },
});

export default EducationScreen;
