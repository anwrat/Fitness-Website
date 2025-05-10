import { useState, useEffect } from "react";
import axios from "axios";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/recipes/");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#0F0505]">
      <UserNav />
      <div className="flex-grow mt-20 pt-30 px-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Explore Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="rounded-xl overflow-hidden shadow-lg bg-[#1a1a1a] cursor-pointer transform transition duration-300 hover:scale-105"
              >
                <div className="relative">
                  {recipe.image_url ? (
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-600">
                      No Image Available
                    </div>
                  )}
                  {/* Nutrition Type Overlay */}
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {recipe.nutrition_type}
                  </span>
                </div>

                {/* Recipe Name Below */}
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold truncate">{recipe.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white">No recipes found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;