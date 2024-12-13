import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 24; // 2 items per row with padding

const PhotoCard = ({photo, index, animationDelay, onPress}) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: animationDelay * (index + 1),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        delay: animationDelay * (index + 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, index, animationDelay]);

  return (
    <TouchableOpacity onPress={() => onPress(photo)}>
      <Animated.View
        style={[
          styles.photoCard,
          {
            backgroundColor: theme.surface,
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Image source={photo.image} style={styles.photo} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const PhotoGalleryScreen = () => {
  const theme = useTheme();
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);

  const galleryData = [
    {
      image: require('../assets/photos/IMG-20241204-WA0003.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0004.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0005.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0006.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0007.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0008.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0009.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0010.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0011.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0012.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0013.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0014.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0015.jpg'),
    },
    {
      image: require('../assets/photos/IMG-20241204-WA0016.jpg'),
    },
    {
      image: require('../assets/photos/p(4).jpeg'),
    },
    {
      image: require('../assets/photos/p(5).jpeg'),
    },
    {
      image: require('../assets/photos/p(6).jpeg'),
    },
    {
      image: require('../assets/photos/p(7).jpeg'),
    },
    {
      image: require('../assets/photos/p(8).jpeg'),
    },
    {
      image: require('../assets/photos/p(9).jpg'),
    },
    {
      image: require('../assets/photos/p(10).jpeg'),
    },
  ];

  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.galleryGrid}>
          {galleryData.map((photo, index) => (
            <PhotoCard
              key={index}
              photo={photo}
              index={index}
              animationDelay={200}
              onPress={handlePhotoPress}
            />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={selectedPhoto !== null}
        transparent={true}
        onRequestClose={() => setSelectedPhoto(null)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedPhoto(null)}>
          <View style={[styles.modalContent, {backgroundColor: theme.surface}]}>
            {selectedPhoto && (
              <Image
                source={selectedPhoto.image}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
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
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
});

export default PhotoGalleryScreen;
