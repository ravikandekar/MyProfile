import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  Platform,
  Alert,
  Clipboard,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ContactLink = ({ icon, label, value, onPress, delay }) => {
  const theme = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.contactItem,
          {
            backgroundColor: theme.surface,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.primary}
          style={styles.icon}
        />
        <View style={styles.contactInfo}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {label}
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={theme.primary}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const ProfileCard = () => {
  const theme = useTheme();
  const slideAnim = React.useRef(new Animated.Value(width)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const images = [
    require('../assets/photos/IMG-20241204-WA0003.jpg'),
    require('../assets/photos/IMG-20241204-WA0004.jpg'),
    require('../assets/photos/IMG-20241204-WA0005.jpg'),
    require('../assets/photos/IMG-20241204-WA0006.jpg'),
    require('../assets/photos/IMG-20241204-WA0007.jpg'),
  ];

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const translateX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -10,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentImageIndex]);

  return (
    <Animated.View
      style={[
        styles.profileCard,
        {
          backgroundColor: theme.surface,
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}>
      <View style={styles.profileImageContainer}>
        <Animated.Image
          source={images[currentImageIndex]}
          style={[
            styles.profileImage,
            {
              transform: [{ translateX }],
            },
          ]}
        />
        <View style={[styles.statusDot, { backgroundColor: theme.primary }]} />
        <View style={styles.imageIndicators}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    index === currentImageIndex ? theme.primary : theme.textSecondary,
                  opacity: index === currentImageIndex ? 1 : 0.5,
                },
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.profileInfo}>
        <Text style={[styles.profileName, { color: theme.text }]}>
          Ravi Kandekar
        </Text>
        <Text style={[styles.profileTitle, { color: theme.textSecondary }]}>
          Senior React Native Developer
        </Text>
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name="circle"
            size={8}
            color={theme.primary}
            style={styles.statusIcon}
          />
          <Text style={[styles.statusText, { color: theme.primary }]}>
            Available for opportunities
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const ContactScreen = () => {
  const theme = useTheme();

  const handlePress = async (type, value) => {
    try {
      switch (type) {
        case 'email':
          const canOpenEmail = await Linking.canOpenURL(`mailto:${value}`);
          if (canOpenEmail) {
            await Linking.openURL(`mailto:${value}`);
          } else {
            // If email client is not available, copy to clipboard
            await Clipboard.setString(value);
            Alert.alert(
              'Email Copied',
              'Email address has been copied to clipboard.',
              [{ text: 'OK' }]
            );
          }
          break;

        case 'phone':
          const formattedPhoneNumber = value.replace(/[^\d+]/g, '');
          const phoneUrl = `tel:${formattedPhoneNumber}`;
          
          const canOpenPhone = await Linking.canOpenURL(phoneUrl);
          if (canOpenPhone) {
            await Linking.openURL(phoneUrl);
          } else {
            if (__DEV__) {
              console.log('Note: Phone calls are not supported in the simulator.');
            }
            // Copy phone number to clipboard as fallback
            await Clipboard.setString(formattedPhoneNumber);
            Alert.alert(
              'Phone Number Copied',
              'Phone number has been copied to clipboard.',
              [{ text: 'OK' }]
            );
          }
          break;

        case 'whatsapp':
          const formattedPhone = value.replace(/\s+/g, '');
          const whatsappUrl = `https://wa.me/${formattedPhone}`;
          const canOpenWhatsapp = await Linking.canOpenURL(whatsappUrl);
          
          if (canOpenWhatsapp) {
            await Linking.openURL(whatsappUrl);
          } else {
            Alert.alert(
              'WhatsApp Not Available',
              'Please install WhatsApp to connect.',
              [{ text: 'OK' }]
            );
          }
          break;

        case 'linkedin':
        case 'github':
        case 'twitter':
          const canOpenUrl = await Linking.canOpenURL(value);
          if (canOpenUrl) {
            await Linking.openURL(value);
          } else {
            await Clipboard.setString(value);
            Alert.alert(
              'Link Copied',
              'The link has been copied to clipboard.',
              [{ text: 'OK' }]
            );
          }
          break;

        default:
          console.log('Unknown link type');
      }
    } catch (error) {
      console.error('Error handling link:', error);
      Alert.alert(
        'Error',
        'Unable to open the link. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  const contactData = [
    {
      icon: 'email',
      label: 'Email',
      value: 'ravikandekar219@gmail.com',
      type: 'email',
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+91 7066104249',
      type: 'phone',
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: '+91 7066104249',
      type: 'whatsapp',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/ravikandekar',
      type: 'linkedin',
      fullUrl: 'https://www.linkedin.com/in/ravindra-kandekar-a30b66246',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'github.com/ravikandekar',
      type: 'github',
      fullUrl: 'https://github.com/ravikandekar',
    },
    {
      icon: 'twitter',
      label: 'Twitter',
      value: '@ravikandekar',
      type: 'twitter',
      fullUrl: 'https://twitter.com/ravikandekar',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Get in Touch</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Feel free to reach out through any of these platforms
          </Text>
        </View>

        <View style={styles.contactList}>
          {contactData.map((item, index) => (
            <ContactLink
              key={item.type}
              icon={item.icon}
              label={item.label}
              value={item.value}
              delay={index * 100}
              onPress={() => handlePress(item.type, item.fullUrl || item.value)}
            />
          ))}
        </View>

        <ProfileCard />
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactList: {
    gap: 12,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  profileCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginTop: 8,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ContactScreen;
