const { OpenAI } = require('openai');
const fetch = require('node-fetch');
const fs = require('fs');
const { promisify } = require('util');

// Create an instance of the OpenAIApi
const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"]
});

// Function to generate API response
async function generateTextWithImage(prompt, imagePath) {
  try {
   

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env["OPENAI_API_KEY"]}`,
    };

    const payload = {
      "model": "gpt-4-vision-preview",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt,
            },
            {
              "type": "image_url",
              "image_url": {
                "url": imagePath,
              },
            },
          ],
        },
      ],
      "max_tokens": 400,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
        return responseData;
  } catch (error) {
    throw error;
  }
}

// handle all functions for recipeRoutes here
const visionController = {

  // Function to generate a recipe based on the prompt and resized image
  generateRecipeFromImage: async (imagePath) => {
    try {
      const prompt = `Generate a cooking recipe using this image.
      The recipe should include the necessary ingredients, and the instructions should contain easy-to-understand vocabulary.
      Only reply with the generated recipe.
      Limit the response to no more than 300 words and in JSON format with the properties and their respective values: title, prep_time, cook_time, servings, ingredients, instructions. Ingredients and Instructions should hold the values in an array. `;

      // Generate the recipe text using the provided prompt and resized image
      const generatedRecipe = await generateTextWithImage(prompt, imagePath);

      // Return the generated recipe
      return generatedRecipe;
    } catch (error) {
      throw error;
    }
  },


};



module.exports = visionController;