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

const ExperienceCard = ({experience, index, animationDelay}) => {
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
          name="briefcase"
          size={24}
          color={theme.primary}
          style={styles.icon}
        />
        <View style={styles.headerText}>
          <Text style={[styles.position, {color: theme.text}]}>
            {experience.position}
          </Text>
          <Text style={[styles.company, {color: theme.textSecondary}]}>
            {experience.company}
          </Text>
        </View>
        <Text style={[styles.duration, {color: theme.textSecondary}]}>
          {experience.duration}
        </Text>
      </View>
      <Text style={[styles.description, {color: theme.text}]}>
        {experience.description}
      </Text>
      
      <View style={styles.skillsContainer}>
        <Text style={[styles.skillsTitle, {color: theme.primary}]}>
          Key Skills:
        </Text>
        <View style={styles.skillsList}>
          {experience.skills.map((skill, idx) => (
            <View
              key={idx}
              style={[styles.skillItem, {backgroundColor: theme.elevation[4]}]}>
              <Text style={[styles.skillText, {color: theme.text}]}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {experience.achievements && (
        <View style={styles.achievementsContainer}>
          <Text style={[styles.achievementsTitle, {color: theme.primary}]}>
            Key Achievements:
          </Text>
          {experience.achievements.map((achievement, idx) => (
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

const ExperienceScreen = () => {
  const theme = useTheme();
  const experienceData = [
    {
      position: 'Senior Software Engineer',
      company: 'Google',
      duration: '2020-Present',
      description:
        'Leading a team of developers in building and maintaining large-scale web applications using React and Node.js.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      achievements: [
        'Led migration of legacy systems to modern tech stack',
        'Improved application performance by 40%',
        'Mentored junior developers',
      ],
    },
    {
      position: 'Software Developer',
      company: 'Microsoft',
      duration: '2018-2020',
      description:
        'Developed and maintained enterprise-level applications using .NET and React.',
      skills: ['.NET', 'React', 'SQL', 'Azure'],
      achievements: [
        'Implemented new features used by millions',
        'Reduced bug count by 60%',
        'Improved CI/CD pipeline',
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {experienceData.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
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
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
  },
  duration: {
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  skillsContainer: {
    marginBottom: 16,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  skillItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  skillText: {
    fontSize: 14,
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

export default ExperienceScreen;
