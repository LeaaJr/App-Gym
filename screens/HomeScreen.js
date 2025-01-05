import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ route }) => {
  // Obtenemos los datos del usuario pasados a través de la navegación
  const { userData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {userData.name}!</Text>
      <Text>Edad: {userData.age} años</Text>
      <Text>Altura: {userData.height} cm</Text>
      <Text>Peso: {userData.weight} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
