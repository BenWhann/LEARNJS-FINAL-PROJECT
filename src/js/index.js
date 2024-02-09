import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from './helpers/helpers.js'; 

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
        return;
    }

    const capitalizedName = capitalize(name.value);
    const totalCalories = calculateCalories(carbs.value, protein.value, fat.value);

    list.insertAdjacentHTML(
        "beforeend",
        `<li class="card">
          <div>
            <h3 class="name">${capitilizedName}</h3>
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