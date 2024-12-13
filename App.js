import React, { useCallback, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext, theme } from './src/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EducationScreen from './src/screens/EducationScreen';
import ExperienceScreen from './src/screens/ExperienceScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ContactScreen from './src/screens/ContactScreen';
import CustomTabBar from './src/components/CustomTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeScreen, setActiveScreen] = useState('Profile');

  const handleTabPress = useCallback((route) => {
    setActiveScreen(route.name);
    setRefreshKey(prev => prev + 1);
  }, []);

  const screenOptions = useCallback(({ route }) => ({
    headerStyle: {
      backgroundColor: theme.dark.surface,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.dark.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    headerBackground: () => (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.dark.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.dark.elevation[2],
        }}
      />
    ),
    tabBarStyle: {
      backgroundColor: theme.dark.surface,
      borderTopColor: theme.dark.border,
      borderTopWidth: 1,
      elevation: 0,
      shadowOpacity: 0,
      height: 60,
      paddingBottom: 8,
    },
  }), []);

  const getScreenComponent = useCallback((Component) => {
    return (props) => {
      const [screenKey, setScreenKey] = useState(0);

      useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          setScreenKey(prev => prev + 1);
        });

        return unsubscribe;
      }, [props.navigation]);

      return <Component {...props} key={screenKey} />;
    };
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} onTabPress={handleTabPress} />}
      screenOptions={screenOptions}>
      <Tab.Screen
        name="Profile"
        component={getScreenComponent(ProfileScreen)}
        options={{
          title: ' Profile'
        }}
      />
      <Tab.Screen
        name="Education"
        component={getScreenComponent(EducationScreen)}
        options={{
          title: 'Education'
        }}
      />
      <Tab.Screen
        name="Experience"
        component={getScreenComponent(ExperienceScreen)}
        options={{
          title: 'Experience'
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={getScreenComponent(ProjectsScreen)}
        options={{
          title: 'Gallery'
        }}
      />
      <Tab.Screen
        name="Contact"
        component={getScreenComponent(ContactScreen)}
        options={{
          title: 'Contact'
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={theme.dark}>
        <StatusBar barStyle="light-content" backgroundColor={theme.dark.background} />
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: theme.dark.primary,
              background: theme.dark.background,
              card: theme.dark.surface,
              text: theme.dark.text,
              border: theme.dark.border,
              notification: theme.dark.primary,
            },
          }}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme.dark.background,
              },
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
