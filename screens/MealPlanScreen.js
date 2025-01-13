// MealPlanScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { generateMealPlan } from '../api/apiService';

const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateMealPlan = async (goal, calories) => {
    setLoading(true);
    try {
      const data = await generateMealPlan(goal, calories);
      setMealPlan(data);
    } catch (error) {
      Alert.alert("Error", "Hubo un problema generando el plan de comidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar Plan de Comidas</Text>

      <Button
        title="Generar Plan de Aumento de Masa Muscular"
        onPress={() => handleGenerateMealPlan('build_muscle', 2500)}
      />
      <Button
        title="Generar Plan de Definición"
        onPress={() => handleGenerateMealPlan('lose_weight', 2000)}
      />
      <Button
        title="Generar Plan de Mantenimiento"
        onPress={() => handleGenerateMealPlan('maintain_weight', 2200)}
      />

      {loading && <Text>Cargando...</Text>}

      {mealPlan && (
        <View>
          <Text>Desayuno: {mealPlan.meals[0].title}</Text>
          <Text>Almuerzo: {mealPlan.meals[1].title}</Text>
          <Text>Cena: {mealPlan.meals[2].title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default MealPlanScreen;
