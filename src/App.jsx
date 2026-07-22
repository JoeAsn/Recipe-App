import Header from './componenets/Header'
import { useState } from 'react';
import Form from './componenets/Form'
import Ingredients from './componenets/ingredient'
import RecipeSection from './componenets/RecipeSection'
import ClaudeRecipe from './componenets/caludeRecipe';
export default function App(){
  let [ingList , setIngList] = useState([]);
  let [apiResult, setApiResult] = useState(null);
  let [isRecipeShown , setIsRecipe] = useState(false)
  return (
    <>
    <Header />
    <Form ingList = {ingList} setIngList = {setIngList}/>
    <Ingredients ingList = {ingList}/>
    {ingList.length > 3 && (
      <RecipeSection
        ingList={ingList}
        recipeReady={isRecipeShown}
        setApiResult={setApiResult}
        setter={setIsRecipe}
      />
    )}
    <ClaudeRecipe recipeReady={isRecipeShown} setter={setIsRecipe} recipeText={apiResult} />
    </>
  )
}