// import { useRef } from "react";
export default function Form({ ingList, setIngList }) {
  // let inputBox = useRef(null);

  function handleAddIng(data) {
    let currIng = Object.fromEntries(data).ingredients.trim()
    // here we can change the data into an object so that we willnot decalre every variable 
    //to get the data we want this is specially useful when the form containes large data.
    //but for checkBox the first value is only returned so we need to grab if by using .getAll
    if (ingList.includes(currIng.toLowerCase())) {
      return;
    }
    setIngList([...ingList, currIng.toLocaleLowerCase()]);
  }

  return (
    <>
      <form action={handleAddIng}>
        <input type="text" placeholder="Enter ingredients" name="ingredients" />
        <button type="submit">
          <img src="/plus-solid-full.svg" alt="" />
          Add ingredients
        </button>
      </form>
    </>
  );
}
