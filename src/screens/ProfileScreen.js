import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Linking,
  Easing,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');
const PROFILE_IMAGE_SIZE = width * 0.4;
 
const RocketTrail = ({x, startY, endY, duration, color, onComplete}) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: duration * 0.7,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: duration * 0.5,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: duration * 0.2,
          useNativeDriver: true,
        }),
      ]),
    ]).start(onComplete);
  }, []);

  const translateY = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [startY, endY],
  });

  const scale = moveAnim.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0.4, 1, 0.8],
  });

  return (
    <Animated.View
      style={[
        styles.rocketTrail,
        {
          left: x,
          opacity: fadeAnim,
          transform: [{translateY}, {scale}],
        },
      ]}>
      <View style={[styles.rocketCore, {backgroundColor: color}]} />
      <View style={[styles.rocketGlow, {backgroundColor: color}]} />
    </Animated.View>
  );
};

const SpiralParticle = ({x, y, radius, angle, delay, color, duration}) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(moveAnim, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: duration * 0.3,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: duration * 0.7,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  }, []);

  const rotate = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const translateX = moveAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, radius * Math.cos(angle), 0, -radius * Math.cos(angle), 0],
  });

  const translateY = moveAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, radius * Math.sin(angle), radius * 2, radius * Math.sin(angle), 0],
  });

  const scale = moveAnim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0.2, 1, 1, 0.1],
  });

  return (
    <Animated.View
      style={[
        styles.spiralParticle,
        {
          left: x,
          top: y,
          opacity: fadeAnim,
          transform: [{translateX}, {translateY}, {rotate}, {scale}],
        },
      ]}>
      <View style={[styles.particleCore, {backgroundColor: color}]} />
      <View style={[styles.particleGlow, {backgroundColor: color}]} />
    </Animated.View>
  );
};

const Firework = ({x, onComplete}) => {
  const [phase, setPhase] = useState('rocket');
  const startY = height;
  const endY = height * 0.3;
  const duration = 1500;

  const colors = [
    '#FFD700', // Gold
    '#FF69B4', // Hot Pink
    '#00FFFF', // Cyan
    '#FF4500', // Orange Red
    '#9400D3', // Dark Violet
    '#32CD32', // Lime Green
    '#FF1493', // Deep Pink
    '#00BFFF', // Deep Sky Blue
    '#FF8C00', // Dark Orange
    '#EE82EE', // Violet
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('burst');
      setTimeout(onComplete, duration);
    }, duration * 0.7);

    return () => clearTimeout(timer);
  }, []);

  if (phase === 'rocket') {
    return (
      <RocketTrail
        x={x}
        startY={startY}
        endY={endY}
        duration={duration * 0.7}
        color={color}
      />
    );
  }

  const particles = new Array(24).fill(0);
  return particles.map((_, index) => {
    const angle = (index / particles.length) * Math.PI * 2;
    const radius = 150 + Math.random() * 50;
    const particleDelay = Math.random() * 200;

    return (
      <SpiralParticle
        key={index}
        x={x}
        y={endY}
        radius={radius}
        angle={angle}
        delay={particleDelay}
        color={color}
        duration={duration}
      />
    );
  });
};

const FireworksDisplay = () => {
  const [fireworks, setFireworks] = useState([]);
  const fireworkCount = useRef(0);

  const addFirework = () => {
    const id = fireworkCount.current++;
    const x = Math.random() * width;
    setFireworks(prev => [...prev, {id, x}]);
  };

  const removeFirework = id => {
    setFireworks(prev => prev.filter(fw => fw.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(addFirework, 1000);
    setTimeout(() => clearInterval(interval), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.fireworksContainer]}>
      {fireworks.map(fw => (
        <Firework
          key={fw.id}
          x={fw.x}
          onComplete={() => removeFirework(fw.id)}
        />
      ))}
    </View>
  );
};

const ImageCarousel = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const images = [
    require('../assets/photos/IMG-20241204-WA0003.jpg'),
    require('../assets/photos/IMG-20241204-WA0004.jpg'),

    require('../assets/photos/IMG-20241204-WA0006.jpg'),

  ];

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      fadeIn();
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    const interval = setInterval(fadeOut, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <Animated.Image
        source={images[currentIndex]}
        style={[
          styles.profileImage,
          {
            opacity: fadeAnim,
            borderColor: theme.primary,
          },
        ]}
      />
      <View style={styles.indicators}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: index === currentIndex ? theme.primary : theme.textSecondary,
                opacity: index === currentIndex ? 1 : 0.5,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [showFireworks, setShowFireworks] = React.useState(true);

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

    const timer = setTimeout(() => {
      setShowFireworks(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim]);

  const stats = [
    {icon: 'code-braces', label: 'Projects', value: '8+'},
    {icon: 'briefcase', label: 'Experience', value: '3 Years'},
    {icon: 'lightning-bolt', label: 'Skills', value: '20+'},
    {icon: 'school', label: 'Education', value: 'Masters'},
  ];

  const skills = [
    {name: 'React Native', level: 90},
    {name: 'JavaScript', level: 95},
    {name: 'React.js', level: 85},
    {name: 'Node.js', level: 80},
  ];

  const socialLinks = [
    {icon: 'github', url: 'https://github.com/ravikandekar'},
    {icon: 'linkedin', url: 'https://www.linkedin.com/in/ravindra-kandekar-a30b66246'},
    {icon: 'whatsapp', url: 'https://wa.me/+917066104249'},
    // {icon: 'email', url: 'ravikandekar219@gmail.com'},
    {icon: 'instagram', url: 'https://www.instagram.com/raviii_kandekar'},
  ];

  const handleSocialPress = async url => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const renderSkillBar = skill => (
    <View key={skill.name} style={styles.skillBarContainer}>
      <View style={styles.skillLabelContainer}>
        <Text style={[styles.skillName, {color: theme.text}]}>{skill.name}</Text>
        <Text style={[styles.skillPercent, {color: theme.textSecondary}]}>
          {skill.level}%
        </Text>
      </View>
      <View style={[styles.skillBarBg, {backgroundColor: theme.elevation[2]}]}>
        <Animated.View
          style={[
            styles.skillBarFg,
            {
              backgroundColor: theme.primary,
              width: `${skill.level}%`,
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <ImageCarousel />
            <View style={styles.socialContainer}>
              {socialLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSocialPress(link.url)}
                  style={[styles.socialButton, {backgroundColor: theme.elevation[4]}]}>
                  <MaterialCommunityIcons
                    name={link.icon}
                    size={28}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={[styles.name, {color: theme.text}]}>Raviii Kandekar</Text>
          <Text style={[styles.title, {color: theme.textSecondary}]}>
            Senior React Native Developer
          </Text>
          <Text style={[styles.location, {color: theme.textSecondary}]}>
            <MaterialCommunityIcons name="map-marker" size={16} /> Nashik, India
          </Text>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View
                key={index}
                style={[styles.statItem, {backgroundColor: theme.elevation[2]}]}>
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

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color={theme.primary}
              />
              <Text style={[styles.sectionTitle, {color: theme.text}]}>
                About Me
              </Text>
            </View>
            <Text style={[styles.bioText, {color: theme.textSecondary}]}>
              Passionate software developer with 3+ years of experience in building
              cross-platform mobile applications and web solutions. Specialized in
              React Native and modern JavaScript frameworks. Committed to creating
              elegant solutions and delivering exceptional user experiences.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color={theme.primary}
              />
              <Text style={[styles.sectionTitle, {color: theme.text}]}>
                Skills
              </Text>
            </View>
            <View style={styles.skillsContainer}>
              {skills.map(renderSkillBar)}
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="certificate"
                size={24}
                color={theme.primary}
              />
              <Text style={[styles.sectionTitle, {color: theme.text}]}>
                Certifications
              </Text>
            </View>
            <View style={styles.certificatesContainer}>
              {[
                'JavaScript Certified Developer',
                'React Native Expert',
              ].map((cert, index) => (
                <View
                  key={index}
                  style={[styles.certItem, {backgroundColor: theme.elevation[2]}]}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={theme.primary}
                  />
                  <Text style={[styles.certText, {color: theme.text}]}>
                    {cert}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      {showFireworks && <FireworksDisplay />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileContainer: {
    margin: 16,
    borderRadius: 20,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#BB86FC',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
  },
  skillsContainer: {
    marginTop: 8,
  },
  skillBarContainer: {
    marginBottom: 12,
  },
  skillLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '500',
  },
  skillPercent: {
    fontSize: 12,
  },
  skillBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillBarFg: {
    height: '100%',
    borderRadius: 3,
  },
  certificatesContainer: {
    marginTop: 8,
  },
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  certText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  fireworksContainer: {
    elevation: 1000,
    zIndex: 1000,
    pointerEvents: 'none',
  },
  rocketTrail: {
    position: 'absolute',
    width: 4,
    height: 20,
    alignItems: 'center',
  },
  rocketCore: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  rocketGlow: {
    position: 'absolute',
    width: '300%',
    height: '100%',
    opacity: 0.3,
    borderRadius: 10,
  },
  spiralParticle: {
    position: 'absolute',
    width: 6,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particleCore: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  particleGlow: {
    position: 'absolute',
    width: '300%',
    height: '300%',
    opacity: 0.2,
    borderRadius: 15,
  },
});

export default ProfileScreen;
