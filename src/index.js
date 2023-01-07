import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import snackbar from "snackbar";
import AppData from "./app-data.js";
import "snackbar/dist/snackbar.min.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// The Chart import syntax is different than you saw in the final project
// We're using a newer version (3.5.x) and following the instructions for Webpack/Parcel
// https://www.chartjs.org/docs/3.5.0/getting-started/integration.html#bundlers-webpack-rollup-etc
import Chart from "chart.js/auto";

// TODO: If you plan on hosting this, make sure to change the entire URL below to your own Firebase Firestore database
const API = new FetchWrapper(
  "https://nutrition-tracker-b1f22-default-rtdb.firebaseio.com"
);

const appData = new AppData();

const firebaseConfig = {

  apiKey: "AIzaSyDNfDByfFY5N4hsLUPVE-5TDKwE3CxY4Js",
  authDomain: "nutrition-tracker-b1f22.firebaseapp.com",
  projectId: "nutrition-tracker-b1f22",
  storageBucket: "nutrition-tracker-b1f22.appspot.com",
  messagingSenderId: "210142797150",
  appId: "1:210142797150:web:5d576080586f281e3843cf",
  measurementId: "G-87MHKHHC6R"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);


const list = document.querySelector("#food-list");
const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");

const displayEntry = (name, carbs, protein, fat) => {
  appData.addFood(carbs, protein, fat);
  list.insertAdjacentHTML(
    "beforeend",
    `<li class="card">
        <div>
          <h3 class="name">${capitalize(name)}</h3>
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
  API.get("/?pageSize=100").then((data) => {
    data.documents?.forEach((doc) => {
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
          borderWidth: 3, // example of other customization
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

const totalCalories = document.querySelector("#total-calories");

const updateTotalCalories = () => {
  totalCalories.textContent = appData.getTotalCalories();
};

const render = () => {
  renderChart();
  updateTotalCalories();
};

init();