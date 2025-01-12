import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GymScreen from './screens/GymScreen';

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

// Pantalla para seleccionar el idioma
const LanguageSelectionScreen = ({ navigation, setLanguage }) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.header}>Elige tu idioma</Text>
      <Button title="Español" onPress={() => { setLanguage('es'); navigation.navigate('HomeTabs'); }} />
      <Button title="English" onPress={() => { setLanguage('en'); navigation.navigate('HomeTabs'); }} />
      <Button title="Português" onPress={() => { setLanguage('pt'); navigation.navigate('HomeTabs'); }} />
    </View>
  );
};

const HomeTabs = ({ translations }) => {
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
        component={GymScreen}
        options={{
          tabBarLabel: translations.gym_tab || 'Gym',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{
          tabBarLabel: translations.food_tab || 'Food',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="IA"
        component={IaIntegrated}
        options={{
          tabBarLabel: translations.ia_tab || 'AI',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: translations.user_tab || 'User',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [language, setLanguage] = useState('es'); // Idioma por defecto
  const [translations, setTranslations] = useState({});

  const languageFiles = {
    es: require('./src/locales/es.json'),
    en: require('./src/locales/en.json'),
    pt: require('./src/locales/pt.json'),
  };

  useEffect(() => {
    if (languageFiles[language]) {
      setTranslations(languageFiles[language]);
    } else {
      console.error("Idioma no soportado");
    }
  }, [language]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LanguageSelection">
        <Stack.Screen name="LanguageSelection">
          {(props) => <LanguageSelectionScreen {...props} setLanguage={setLanguage} />}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeTabs" component={() => <HomeTabs translations={translations} />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
