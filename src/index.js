import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import snackbar from "snackbar";
import AppData from "./app-data.js";
import "snackbar/dist/snackbar.min.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import Chart from "chart.js/auto";

const API = new FetchWrapper(
  "https://nutrition-logger-4a682-default-rtdb.firebaseio.com/"
);

const appData = new AppData();

const firebaseConfig = {

  apiKey: "AIzaSyDaNdqJ6U40eJO_nosHlw7Lj0_MzbXGvAg",
  authDomain: "nutrition-logger-4a682.firebaseapp.com",
  projectId: "nutrition-logger-4a682",
  storageBucket: "nutrition-logger-4a682.appspot.com",
  messagingSenderId: "434895144907",
  appId: "1:434895144907:web:481cff3fc742342ebb584e",
  measurementId: "G-F2ZJESK4VN"

};


// ************* Add route to username login and add username to display on main page ***********

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

snackbar.duration = 1500;
snackbar.gap = 250;

const list = document.querySelector("#food-list");
const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");

const registerCloseBtns = () => {
  const cardClosers = document.querySelectorAll(".delete-btn");
  cardClosers.forEach((card, index) => {
    if (card.oldOnClick) {
      card.removeEventListener('click', card.oldOnClick)
    };

    const newOnClick = () => {
      handleCardClose(index, card);
    };

    card.addEventListener('click', newOnClick);
    card.oldOnClick = newOnClick;
  });
};

const handleCardClose = (position, card) => {
  API.post("/history.json", {
    position
  }).then((data) => {
    console.log(data)
    if (data.error) {
      console.error(data.error)
        snackbar.show(
          "Unable to remove item."
        );
    } else {
      card.parentNode.parentNode.remove();
        snackbar.show(
          "Removed Item"
        );
      appData.removeFood(position);
      render();
    };
  });
};

const displayEntry = (name, carbsRaw, proteinRaw, fatRaw) => {
  const carbs = (carbsRaw != 0) ? carbsRaw : 0;
  const protein = (proteinRaw != 0) ? proteinRaw : 0; 
  const fat = (fatRaw != 0) ? fatRaw : 0;  
  appData.addFood(carbs, protein, fat);
  list.insertAdjacentHTML(
    "beforeend",
    `<li class="card">
        <div>
          <h3 class="name">${capitalize(name)}</h3>
          <button type="button" class="delete-btn">Delete</button>
          <div class="calories">${calculateCalories(
            carbs,
            protein,
            fat
          )} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
          </ul>
        </div>
      </li>`
  );
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  API.post("/history.json", {
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
      snackbar.show("Some data is missing.");
      return;
    }

    snackbar.show("Food added successfully.");

    displayEntry(name.value, carbs.value, protein.value, fat.value);
    render();

    name.value = "";
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  });
});

const init = () => {
  API.get("/history.json?pageSize=100").then((data) => {
    data?.documents?.forEach((doc) => {
      const fields = doc.fields;

      displayEntry(
        fields.name.stringValue,
        fields.carbs.integerValue,
        fields.protein.integerValue,
        fields.fat.integerValue
      );
    });
    render();
  });
};

let chartInstance = null;
const renderChart = () => {
  chartInstance?.destroy();
  const context = document.querySelector("#app-chart").getContext("2d");

  chartInstance = new Chart(context, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Macronutrients",
          data: [
            appData.getTotalCarbs(),
            appData.getTotalProtein(),
            appData.getTotalFat(),
          ],
          backgroundColor: ["#25AEEE", "#FECD52", "#57D269"],
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        y: {
            ticks: {
              beginAtZero: true,
            },
          },
      },
    },
  });
};

const totalCalories = document.querySelector("#total-calories");

const updateTotalCalories = () => {
  totalCalories.textContent = appData.getTotalCalories();
};

// call render
const render = () => {
  renderChart();
  updateTotalCalories();
  registerCloseBtns();
};

init();
