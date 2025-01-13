import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Picker } from 'react-native';
import { fetchRecipesByCalories, generateMealPlan } from '../api/apiService'; // Importa las funciones de la API
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación

const FoodScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('definicion'); // Valor por defecto: "definición"

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipesByCalories(600); // Límite de 600 calorías
        setRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);

  const handleGenerateMealPlan = async () => {
    try {
      const mealPlan = await generateMealPlan(selectedGoal); // Generar plan de comidas según la meta seleccionada
      navigation.navigate('MealPlan', { mealPlan }); // Navegar al MealPlanScreen con el plan generado
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  const handleViewRecipe = (recipeId) => {
    navigation.navigate('RecipeDetail', { recipeId }); // Navegar a la pantalla de detalles de la receta
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendaciones de Comidas</Text>
      
      {/* Selector de objetivo: Aumento, Definición o Bajando de Peso */}
      <Text style={styles.subTitle}>Selecciona tu objetivo</Text>
      <Picker
        selectedValue={selectedGoal}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedGoal(itemValue)}
      >
        <Picker.Item label="Definición" value="definicion" />
        <Picker.Item label="Aumento de Masa" value="aumento" />
        <Picker.Item label="Bajar de Peso" value="bajar" />
      </Picker>

      {/* Botón para generar plan de comidas */}
      <Button title="Generar Plan de Comidas" onPress={handleGenerateMealPlan} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              title={item.title}
              image={item.image}
              onPress={() => handleViewRecipe(item.id)} // Al hacer clic, navegará a la receta
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
});

export default FoodScreen;
