// BottomTabs.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import StatusScreen from "@/screens/StatusScreen";
import CallsScreen from "@/screens/CallsScreen";
import SettingsScreen from "@/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const Icon = options.tabBarIcon;

        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.tabButtonActive]}
          >
            <View style={styles.iconContainer}>
              {Icon({
                color: isFocused ? "#fff" : "#000",
                size: 24,
              })}

              {/* Fake badge example for demo */}
              {(route.name === "Home" || route.name === "Calls") && (
                <View style={styles.badge} />
              )}
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {options.tabBarLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          tabBarLabel: "Status",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="aperture" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          tabBarLabel: "Calls",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="phone" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 20,
    marginLeft: -5,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 10,
    zIndex: 100,
  },
  tabButton: {
    alignItems: "center",
    padding: 10,
    width: 80,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  tabButtonActive: {
    backgroundColor: "#000",
  },
  iconContainer: {
    position: "relative",
  },
  label: {
    fontSize: 12,
    marginTop: 3,
    color: "#FFF",
  },
  labelActive: {
    color: "#fff",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
  },
});

export default BottomTabs;
