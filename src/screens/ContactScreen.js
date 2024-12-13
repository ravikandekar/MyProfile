import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Animated,
  link
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SocialButton = ({social, index, animationDelay}) => {
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
  const handleSocialPress = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(social.url);
      if (supported) {
        await Linking.openURL(social.url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <AnimatedTouchable
      onPress={handlePress}
      style={[
        styles.socialButton,
        {
          backgroundColor: theme.elevation[4],
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <MaterialCommunityIcons
        name={social.icon}
        size={28}
        color={theme.primary}
        style={styles.socialIcon}
      />
      <View style={styles.socialTextContainer}>
        <Text style={[styles.socialPlatform, {color: theme.text}]}>
          {social.platform}
        </Text>
        <Text style={[styles.socialUsername, {color: theme.textSecondary}]}>
          {social.username}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={theme.primary}
        style={styles.chevron}
      />
    </AnimatedTouchable>
  );
};

const ContactInfo = ({info, index, animationDelay}) => {
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
        styles.infoCard,
        {
          backgroundColor: theme.surface,
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
        },
      ]}>
      <MaterialCommunityIcons
        name={info.icon}
        size={24}
        color={theme.primary}
        style={styles.infoIcon}
      />
      <View style={styles.infoTextContainer}>
        <Text style={[styles.infoLabel, {color: theme.textSecondary}]}>
          {info.label}
        </Text>
        <Text style={[styles.infoValue, {color: theme.text}]}>{info.value}</Text>
      </View>
    </Animated.View>
  );
};

const ContactScreen = () => {
  const theme = useTheme();

  const contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'ravikandekar219@gmail.com',
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+917066104249',
    },
    {
      icon: 'map-marker',
      label: 'Location',
      value: 'Nshik, Maharashtra',
    },
  ];

  const socialLinks = [
    {
      platform: 'GitHub',
      username: '@ravikandekar',
      icon: 'github',
      url: 'https://github.com/ravikandekar',
    },
    {
      platform: 'LinkedIn',
      username: 'Ravi Kandekar',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/ravindra-kandekar-a30b66246',
    },
    {
      platform: 'Whatsapp',
      username: '@ravikandekar',
      icon: 'whatsapp',
      url: 'https://wa.me/+917066104249',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            Contact Information
          </Text>
          {contactInfo.map((info, index) => (
            <ContactInfo
              key={index}
              info={info}
              index={index}
              animationDelay={300}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            Social Media
          </Text>
          {socialLinks.map((social, index) => (
            
            <SocialButton
              key={index}
              social={social}
              index={index}
              animationDelay={300}
            />
          ))}
        </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  socialIcon: {
    marginRight: 16,
  },
  socialTextContainer: {
    flex: 1,
  },
  socialPlatform: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  socialUsername: {
    fontSize: 14,
  },
  chevron: {
    marginLeft: 8,
  },
});

export default ContactScreen;
