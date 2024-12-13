import React, { useCallback, useState, useEffect, useMemo } from 'react';
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

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTabPress = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const screenOptions = useMemo(() => ({ route }) => ({
    headerStyle: {
      backgroundColor: theme.dark.surface,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: theme.dark.primary,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      switch (route.name) {
        case 'Profile':
          iconName = 'account';
          break;
        case 'Education':
          iconName = 'school';
          break;
        case 'Experience':
          iconName = 'briefcase';
          break;
        case 'Gallery':
          iconName = 'image';
          break;
        case 'Contact':
          iconName = 'phone';
          break;
        default:
          iconName = 'circle';
      }

      return (
        <MaterialCommunityIcons
          name={iconName}
          size={size}
          color={color}
        />
      );
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
    <SafeAreaProvider>
      <ThemeContext.Provider value={theme.dark}>
        <StatusBar barStyle="light-content" backgroundColor={theme.dark.surface} />
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
            <Stack.Screen name="MainTabs">
              {() => (
                <Tab.Navigator
                  tabBar={props => <CustomTabBar {...props} onTabPress={handleTabPress} />}
                  screenOptions={screenOptions}>
                  <Tab.Screen
                    name="Profile"
                    component={getScreenComponent(ProfileScreen)}
                    options={{
                      title: 'Profile'
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
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;
