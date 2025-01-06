import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  // Estados para almacenar los valores del formulario y el mensaje de error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Simula las credenciales correctas
    const correctUsername = 'u123';
    const correctPassword = 'con123';

    // Verifica si las credenciales coinciden
    if (username === correctUsername && password === correctPassword) {
      // Si son correctas, navega a la pantalla principal
      navigation.navigate('HomeTabs');
    } else {
      // Si no coinciden, muestra un mensaje de error
      setError('Usuario y/o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Usuario / Email"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Mostrar mensaje de error si las credenciales son incorrectas */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Botón de inicio de sesión */}
      <Button title="Ingresar" color="#1E90FF" onPress={handleLogin} />

      {/* Botón para redirigir al registro */}
      <Button
        title="Registrarse"
        color="#1E90FF"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: '#fff',
  },
  errorText: {
    color: '#ff4d4d', // Rojo para el mensaje de error
    marginBottom: 15,
  },
});

export default LoginScreen;
