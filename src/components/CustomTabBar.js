import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../context/ThemeContext';

const CustomTabBar = ({state, descriptors, navigation, onTabPress}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.surface}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
          
          if (onTabPress) {
            onTabPress(route);
          }
        };

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
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[
              styles.tabButton,
              isFocused && {
                backgroundColor: theme.elevation[4],
                borderRadius: 12,
              },
            ]}>
            <Animated.View
              style={[
                styles.iconContainer,
                {
                  transform: [
                    {
                      scale: isFocused ? 1.2 : 1,
                    },
                  ],
                },
              ]}>
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={isFocused ? theme.primary : theme.textSecondary}
                style={styles.icon}
              />
            </Animated.View>
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? theme.primary : theme.textSecondary,
                  fontSize: isFocused ? 13 : 12,
                  fontWeight: isFocused ? '600' : '400',
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    marginTop: 4,
  },
});

export default CustomTabBar;
