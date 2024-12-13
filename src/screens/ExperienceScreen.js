import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
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
            {experience.company} • {experience.duration}
          </Text>
        </View>
      </View>

      <Text style={[styles.description, {color: theme.text}]}>
        {experience.description}
      </Text>

      {experience.skills && (
        <View style={styles.skillsContainer}>
          {experience.skills.map((skill, idx) => (
            <View
              key={idx}
              style={[styles.skillChip, {backgroundColor: theme.elevation[4]}]}>
              <Text style={[styles.skillText, {color: theme.primary}]}>
                {skill}
              </Text>
            </View>
          ))}
        </View>
      )}

      {experience.achievements && (
        <View style={styles.achievementsContainer}>
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

const SkillCard = ({skill, index, animationDelay}) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: animationDelay * (index + 1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: animationDelay * (index + 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index, animationDelay]);

  return (
    <Animated.View
      style={[
        styles.skillCard,
        {
          backgroundColor: theme.surface,
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name={skill.icon}
            size={28}
            color={theme.primary}
          />
          <Text style={[styles.skillTitle, {color: theme.text}]}>
            {skill.category}
          </Text>
        </View>
      </View>

      <View style={styles.technologiesContainer}>
        {skill.technologies.map((tech, index) => (
          <View
            key={index}
            style={[styles.techChip, {backgroundColor: theme.elevation[2]}]}>
            <Text style={[styles.techText, {color: theme.primary}]}>{tech}</Text>
          </View>
        ))}
      </View>

      <View style={styles.featuresContainer}>
        <Text style={[styles.featuresTitle, {color: theme.text}]}>
          Capabilities
        </Text>
        {skill.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={theme.primary}
            />
            <Text style={[styles.featureText, {color: theme.textSecondary}]}>
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const ExperienceScreen = () => {
  const theme = useTheme();
  const experienceData = [
    {
      position: 'Senior Software Engineer',
      company: 'Sumago Infotech',
      duration: '2023-Present',
      description:
        'Leading a team of developers in building and maintaining large-scale web applications using React Native and Node.js.',
      skills: ['React', 'Node.js', 'JavaScript', 'AWS'],
      achievements: [
        'Improved application performance by 40%',
        'Mentored junior developers',
      ],
    },
    {
      position: 'Internship',
      company: 'Spaklers',
      duration: '2022',
      description:
        'A React Native internship offers hands-on experience in building cross-platform mobile applications using JavaScript and React, focusing on UI/UX design, app functionality, and performance optimization.',
      skills: ['React Native', 'JavaScript', 'MongoDB'],
      achievements: [
        'Reduced bug count by 60%',
        'Developed and Deployed Apps:',
      ],
    },
  ];

  const skillsData = [
    {
      category: 'Frontend Development',
      icon: 'cellphone-link',
      technologies: [
        'React Native',
        'React.js',
        'JavaScript',
        'TypeScript',
        'Redux',
        'Context API',
      ],
      features: [
        'Cross-platform mobile app development',
        'Responsive UI/UX design',
        'Custom animations and transitions',
        'State management',
        'Performance optimization',
      ],
    },
    {
      category: 'Backend Integration',
      icon: 'database',
      technologies: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'Firebase',
        'REST APIs',
        'GraphQL',
      ],
      features: [
        'API development and integration',
        'Database design and management',
        'Authentication and authorization',
        'Real-time data synchronization',
        'Cloud service integration',
      ],
    },
    {
      category: 'Development Tools',
      icon: 'tools',
      technologies: [
        'Git',
        'GitHub',
        'VS Code',
        'Postman',
        'Android Studio',
        'Xcode',
      ],
      features: [
        'Version control',
        'Code review',
        'Debugging and testing',
        'Performance profiling',
        'Cross-platform deployment',
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, {color: theme.text}]}>Experience</Text>
        {experienceData.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
            index={index}
            animationDelay={300}
          />
        ))}
        
        <Text style={[styles.sectionTitle, {color: theme.text, marginTop: 20}]}>
          Skills & Expertise
        </Text>
        {skillsData.map((skill, index) => (
          <SkillCard
            key={index}
            skill={skill}
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    marginHorizontal: -4,
  },
  skillChip: {
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
  skillCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContainer: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  techChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  techText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuresContainer: {
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ExperienceScreen;
