import React, {useEffect, useRef} from 'react';
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
    {icon: 'email', url: 'ravikandekar219@gmail.com'},
    {icon: 'instagram', url: 'https://www.instagram.com/raviii_kandekar'},
  ];

  const handleSocialPress = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const renderSkillBar = (skill) => (
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
              {['AWS Certified Developer', 'Google Cloud Professional', 'React Native Expert'].map(
                (cert, index) => (
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
                ),
              )}
            </View>
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
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#BB86FC',  
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
});

export default ProfileScreen;
