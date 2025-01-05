import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';

const loadFonts = async () => {
  await Font.loadAsync(Ionicons.font);
};

loadFonts();


// Pantallas que vamos a usar
const GymScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Rutinas</Text>
  </View>
);

const FoodScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Comidas</Text>
  </View>
);

const UserScreen = () => (
  <View style={styles.screenContainer}>
    <Text>Usuario</Text>
  </View>
);

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Gym"
        screenOptions={{
          tabBarActiveTintColor: '#1E90FF', // Color cuando la pestaña está activa
          tabBarInactiveTintColor: '#B0B0B0', // Color cuando la pestaña está inactiva
          tabBarStyle: {
            backgroundColor: '#fff', // Fondo de la barra de navegación
          },
        }}
      >
        <Tab.Screen
          name="Gym"
          component={GymScreen}
          options={{
            tabBarLabel: 'Pesas',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barbell-outline" size={size} color={color} /> // Cambié ios-barbell a barbell
            ),
          }}
        />
        <Tab.Screen
          name="Food"
          component={FoodScreen}
          options={{
            tabBarLabel: 'Comidas',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="restaurant-outline" size={size} color={color} /> // Cambié ios-restaurant a restaurant
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={LoginScreen}
          options={{
            tabBarLabel: 'Usuario',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} /> // Cambié ios-person a person
            ),
          }}
        />


      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;
