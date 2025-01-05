import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LoginScreen = ({ navigation }) => {
  // Estados para almacenar los datos del usuario
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [physical_activity_level, setPhysical] = useState('');
  const [main_objective, setObjective] = useState('');
  const [body_measurements, setBody] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [biceps, setBiceps] = useState('');

  // Función para manejar los cambios en los campos
  const handleInputChange = (setter, value) => {
    // Eliminar cualquier cosa que no sea un número (si es necesario)
    const cleanValue = value.replace(/[^0-9]/g, '');
    setter(cleanValue); // Actualiza el campo correspondiente
  };

  // Función para manejar el submit del formulario
  const handleSubmit = () => {
    // Guardamos la información del usuario en un objeto
    const userData = {
      name,
      age,
      height,
      weight,
      gender,
      physical_activity_level,
      main_objective,
      body_measurements,
      birthdate,
      biceps,
    };

    // Aquí puedes guardar la información en algún almacenamiento, como AsyncStorage
    // Por ahora, solo mostramos un mensaje de confirmación
    console.log(userData);

    // Navegar a la siguiente pantalla, por ejemplo a la pantalla principal
    navigation.navigate('Home', { userData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión / Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={age}
        onChangeText={(value) => handleInputChange(setAge, value)} // Validación solo números
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={(value) => handleInputChange(setHeight, value)} // Validación solo números
      />

      <Text>Género</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Femenino" value="femenino" />
        <Picker.Item label="Otro" value="otro" />
      </Picker>

      <Text>Nivel de actividad Física</Text>
      <Picker
        selectedValue={physical_activity_level}
        onValueChange={(itemValue) => setPhysical(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="Sedentario" value="Sedentario" />
        <Picker.Item label="Casual" value="Casual" />
        <Picker.Item label="Activo" value="Activo" />
        <Picker.Item label="Muy Activo" value="Muy Activo" />
      </Picker>

      <Text>Objetivo principal</Text>
      <Picker
        selectedValue={main_objective}
        onValueChange={(itemValue) => setObjective(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="Bajar de peso" value="Bajar de peso" />
        <Picker.Item label="Ganar masa muscular" value="Ganar masa muscular" />
        <Picker.Item label="Mantenimiento" value="Mantenimiento" />
      </Picker>

      <Text>Medidas corporales (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Cintura"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cadera"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Pecho"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Bíceps (cm)"
        value={biceps}
        onChangeText={(value) => handleInputChange(setBiceps, value)} // Validación solo números
        keyboardType="numeric"
      />    

      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento"
        value={birthdate}
        onChangeText={setBirthdate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
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
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
