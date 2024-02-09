import FetchWrapper from "./helpers/fetch-wrapper.js";
import { capitalize, calculateCalories } from './helpers/helpers.js'; 
const snackbar = require('snackbar');

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/beanwang"
);

const list = document.querySelector("#food-list");
const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  API.post("/", {
    fields: {
      name: { stringValue: name.value },
      carbs: { integerValue: carbs.value },
      protein: { integerValue: protein.value },
      fat: { integerValue: fat.value },
    },
  }).then((data) => {
    console.log(data);
    if (data.error) {
        // there was an error
        snackbar.show('Some data is missing here');
        return;
    }

    const capitalizedName = capitalize(name.value);
    const totalCalories = calculateCalories(carbs.value, protein.value, fat.value);
    snackbar.show('Food added successfully');
    list.insertAdjacentHTML(
        "beforeend",
        `<li class="card">
          <div>
            <h3 class="name">${capitalizedName}</h3>
            <div class="calories">${totalCalories} calories</div>
            <ul class="macros">
              <li class="carbs"><div>Carbs</div><div class="value">${carbs.value}g</div></li>
              <li class="protein"><div>Protein</div><div class="value">${protein.value}g</div></li>
              <li class="fat"><div>Fat</div><div class="value">${fat.value}g</div></li>
            </ul>
          </div>
        </li>`
    );

    name.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});

const init = () => {
  // TODO: Get the saved entries and list them
API.get('').then(data => {
  console.log(data.documents)
  const documents = data.documents;
  documents.forEach(document => {
    console.log(document.fields.carbs)
    list.insertAdjacentHTML(
      "afterbegin",
      `<li class="card">
        <div>
          <h3 class="name">${capitalize(document.fields.name.stringValue)}</h3>
          <div class="calories">${calculateCalories(document.fields.carbs.integerValue, document.fields.protein.integerValue, document.fields.fat.integerValue)} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${document.fields.carbs.integerValue}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${document.fields.protein.integerValue}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${document.fields.fat.integerValue}g</div></li>
          </ul>
        </div>
      </li>`
  )})
})
}

init();