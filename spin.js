import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors()); // <-- habilita CORS

app.get("/combo", async (req, res) => {
  try {
    // Busca receita aleatória
    const mealRes = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const mealData = await mealRes.json();

    // Busca drink aleatório
    const drinkRes = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const drinkData = await drinkRes.json();

    res.json({
      meal: mealData.meals[0],
      drink: drinkData.drinks[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
