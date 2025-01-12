import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

const FoodScreen = () => {
  const [foodRecommendations, setFoodRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tu clave de API
  const apiKey = '26e329a7bc4f4ffe89aab4d68d984b9f';

  // Función para obtener recetas por calorías (complexSearch)
  const getRecipesByCalories = async (calories) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?maxCalories=${calories}&apiKey=${apiKey}`);
      const data = await response.json();
      setFoodRecommendations(data.results);
    } catch (error) {
      console.error('Error fetching recipes by calories', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener recetas por macronutrientes (findByNutrients)
  const getRecipesByMacros = async (calories, protein, fat, carbs) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByNutrients?calories=${calories}&protein=${protein}&fat=${fat}&carbs=${carbs}&apiKey=${apiKey}`
      );
      const data = await response.json();
      setFoodRecommendations(data);
    } catch (error) {
      console.error('Error fetching recipes by macronutrients', error);
    } finally {
      setLoading(false);
    }
  };

  // Función que se ejecuta al cargar la pantalla
  useEffect(() => {
    // Ejemplo: obtener recetas con un máximo de 600 calorías
    getRecipesByCalories(600);
    // O también puedes usar getRecipesByMacros para obtener recetas basadas en macronutrientes
    // getRecipesByMacros(600, 20, 10, 50); // 600 calorías, 20g proteína, 10g grasa, 50g carbohidratos
  }, []);

  // Renderizar los resultados en una lista
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recomendaciones de Comidas</Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={foodRecommendations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Button
                title="Ver receta"
                onPress={() => alert(`Ver receta de ${item.title}`)} // Aquí puedes agregar la navegación para mostrar la receta completa
              />
            </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeCard: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default FoodScreen;
