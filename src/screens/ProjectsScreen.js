import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProjectCard = ({project, index, animationDelay}) => {
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

  const handleLinkPress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

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
          name="code-braces"
          size={24}
          color={theme.primary}
          style={styles.icon}
        />
        <View style={styles.headerText}>
          <Text style={[styles.projectName, {color: theme.text}]}>
            {project.name}
          </Text>
          <Text style={[styles.projectType, {color: theme.textSecondary}]}>
            {project.type}
          </Text>
        </View>
      </View>

      <Text style={[styles.description, {color: theme.text}]}>
        {project.description}
      </Text>

      <View style={styles.techContainer}>
        <Text style={[styles.techTitle, {color: theme.primary}]}>
          Technologies Used:
        </Text>
        <View style={styles.techList}>
          {project.technologies.map((tech, idx) => (
            <View
              key={idx}
              style={[styles.techItem, {backgroundColor: theme.elevation[4]}]}>
              <Text style={[styles.techText, {color: theme.text}]}>{tech}</Text>
            </View>
          ))}
        </View>
      </View>

      {project.features && (
        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, {color: theme.primary}]}>
            Key Features:
          </Text>
          {project.features.map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color={theme.primary}
                style={styles.checkIcon}
              />
              <Text style={[styles.featureText, {color: theme.text}]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
      )}

      {project.links && (
        <View style={styles.linksContainer}>
          {project.links.map((link, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.linkButton, {backgroundColor: theme.elevation[4]}]}
              onPress={() => handleLinkPress(link.url)}>
              <MaterialCommunityIcons
                name={link.icon}
                size={20}
                color={theme.primary}
                style={styles.linkIcon}
              />
              <Text style={[styles.linkText, {color: theme.text}]}>
                {link.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const ProjectsScreen = () => {
  const theme = useTheme();
  const projectsData = [
    {
      name: 'E-Commerce Platform',
      type: 'Full Stack Application',
      description:
        'A modern e-commerce platform with real-time inventory management and secure payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: [
        'Real-time inventory tracking',
        'Secure payment processing',
        'Admin dashboard',
        'Analytics reporting',
      ],
      links: [
        {
          label: 'GitHub',
          url: 'https://github.com/username/project',
          icon: 'github',
        },
        {
          label: 'Live Demo',
          url: 'https://project-demo.com',
          icon: 'web',
        },
      ],
    },
    {
      name: 'AI Image Generator',
      type: 'Machine Learning Application',
      description:
        'An AI-powered image generation tool using deep learning models to create unique artwork.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
      features: [
        'Custom model architecture',
        'Real-time generation',
        'Style transfer',
        'Batch processing',
      ],
      links: [
        {
          label: 'GitHub',
          url: 'https://github.com/username/ai-project',
          icon: 'github',
        },
        {
          label: 'Research Paper',
          url: 'https://example.com/paper',
          icon: 'file-document',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
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
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectType: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  techContainer: {
    marginBottom: 16,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  techItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  techText: {
    fontSize: 14,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  linkIcon: {
    marginRight: 8,
  },
  linkText: {
    fontSize: 14,
  },
});

export default ProjectsScreen;
