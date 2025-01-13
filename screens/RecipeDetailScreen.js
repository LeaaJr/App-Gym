// RecipeDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { fetchRecipeById } from '../api/apiService'; // Asegúrate de tener esta función

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params; // Recibe el ID de la receta desde la pantalla anterior
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeById(recipeId); // Función que obtiene la receta por ID
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    getRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.subtitle}>Ingredientes:</Text>
      <Text>{recipe.ingredients}</Text>
      <Text style={styles.subtitle}>Instrucciones:</Text>
      <Text>{recipe.instructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen;
