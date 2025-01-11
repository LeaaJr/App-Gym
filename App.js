import React from 'react';
import { StyleSheet, View, Text } from 'react-native'; // Asegúrate de importar View y Text
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GymScreen from './screens/GymScreen'; // Importa GymScreen correctamente

// Aquí se pueden agregar más pantallas si es necesario
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

const IaIntegrated = () => (
  <View style={styles.screenContainer}>
    <Text>IA consulta</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Gym"
      screenOptions={{
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Tab.Screen
        name="Gym"
        component={GymScreen} // Usa el componente GymScreen para mostrar los ejercicios
        options={{
          tabBarLabel: 'Pesas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{
          tabBarLabel: 'Comidas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="IA"
        component={IaIntegrated}
        options={{
          tabBarLabel: 'IA',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'Usuario',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Reemplaza las propiedades shadow*
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
