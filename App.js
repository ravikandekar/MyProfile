import React, {useCallback, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext, theme} from './src/context/ThemeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

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

  const handleTabPress = useCallback((route) => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} onTabPress={handleTabPress} />}
      screenOptions={({route}) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.dark.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.dark.text,
        },
        tabBarStyle: {
          backgroundColor: theme.dark.surface,
          borderTopColor: theme.dark.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({focused, color, size}) => {
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
            case 'Projects':
              iconName = 'code-braces';
              break;
            case 'Contact':
              iconName = 'contacts';
              break;
            default:
              iconName = 'circle';
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={focused ? theme.dark.primary : theme.dark.textSecondary}
            />
          );
        },
      })}>
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        key={`Profile-${refreshKey}`}
        options={{
          title: 'My Profile'
        }}
      />
      <Tab.Screen 
        name="Education" 
        component={EducationScreen}
        key={`Education-${refreshKey}`}
        options={{
          title: 'Education'
        }}
      />
      <Tab.Screen 
        name="Experience" 
        component={ExperienceScreen}
        key={`Experience-${refreshKey}`}
        options={{
          title: 'Experience'
        }}
      />
      <Tab.Screen 
        name="Projects" 
        component={ProjectsScreen}
        key={`Projects-${refreshKey}`}
        options={{
          title: 'Projects'
        }}
      />
      <Tab.Screen 
        name="Contact" 
        component={ContactScreen}
        key={`Contact-${refreshKey}`}
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
