import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Picker, ActivityIndicator, Image } from 'react-native';
import { getExercises, getBodyPartList, getEquipmentList, getTargetList, getExercisesByBodyPart, getExercisesByEquipment, getExercisesByTarget } from '../api/apiService';

const GymScreen = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bodyParts, setBodyParts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [targets, setTargets] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bodyPartList = await getBodyPartList();
        const equipmentList = await getEquipmentList();
        const targetList = await getTargetList();
        setBodyParts(bodyPartList);
        setEquipment(equipmentList);
        setTargets(targetList);

        // Fetch initial exercises
        const exercisesList = await getExercises();
        setExercises(exercisesList);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = async () => {
    setLoading(true);
    let filteredExercises = [];

    if (selectedBodyPart) {
      filteredExercises = await getExercisesByBodyPart(selectedBodyPart);
    } else if (selectedEquipment) {
      filteredExercises = await getExercisesByEquipment(selectedEquipment);
    } else if (selectedTarget) {
      filteredExercises = await getExercisesByTarget(selectedTarget);
    } else {
      filteredExercises = await getExercises(); // If no filter, show all exercises
    }

    setExercises(filteredExercises);
    setLoading(false);
  };

  const renderExercise = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.gifUrl }} style={styles.exerciseImage} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.exerciseDetail}>Parte del cuerpo: {item.bodyPart}</Text>
      <Text style={styles.exerciseDetail}>Objetivo: {item.target}</Text>
      <Text style={styles.exerciseDetail}>Equipo: {item.equipment}</Text>
      <Text style={styles.exerciseDetail}>Descripción: {item.description || 'No disponible'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.filters}>
            <Picker selectedValue={selectedBodyPart} onValueChange={setSelectedBodyPart}>
              <Picker.Item label="Selecciona parte del cuerpo" value="" />
              {bodyParts.map((bodyPart) => (
                <Picker.Item key={bodyPart} label={bodyPart} value={bodyPart} />
              ))}
            </Picker>
            <Picker selectedValue={selectedEquipment} onValueChange={setSelectedEquipment}>
              <Picker.Item label="Selecciona equipo" value="" />
              {equipment.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
            <Picker selectedValue={selectedTarget} onValueChange={setSelectedTarget}>
              <Picker.Item label="Selecciona objetivo" value="" />
              {targets.map((target) => (
                <Picker.Item key={target} label={target} value={target} />
              ))}
            </Picker>
            <Button title="Filtrar Ejercicios" onPress={handleFilterChange} />
          </View>

          <FlatList
            data={exercises}
            renderItem={renderExercise}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filters: {
    marginBottom: 20,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  exerciseImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  exerciseDetail: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color: '#555',
  },
});

export default GymScreen;
