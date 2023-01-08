var $8rQ4N$snackbar = require("snackbar");
require("snackbar/dist/snackbar.min.css");
var $8rQ4N$firebaseapp = require("firebase/app");
var $8rQ4N$firebasefirestore = require("firebase/firestore");
var $8rQ4N$firebaseanalytics = require("firebase/analytics");
var $8rQ4N$chartjsauto = require("chart.js/auto");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
class $5b78002761577cc4$export$2e2bcd8739ae039 {
    constructor(baseURL){
        this.baseURL = baseURL;
        console.log(baseURL);
    }
    get(endpoint) {
        return fetch(this.baseURL + endpoint).then((response)=>response.json());
    }
    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }
    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }
    patch(endpoint, body) {
        return this._send("patch", endpoint, body);
    }
    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }
    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response)=>response.json());
    }
}


const $20b4a97a61b3fccb$export$9a00dee1beb8f576 = (word)=>{
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
};
const $20b4a97a61b3fccb$export$19ca57dbab2b06c3 = (carbs = 0, protein = 0, fat = 0)=>{
    return carbs * 4 + protein * 4 + fat * 9;
};



class $441ed6e1c4756e31$export$2e2bcd8739ae039 {
    constructor(){
        this.food = [];
    }
    addFood(carbs, protein, fat) {
        this.food.push({
            carbs: Number.parseInt(carbs, 10),
            protein: Number.parseInt(protein, 10),
            fat: Number.parseInt(fat, 10)
        });
    }
    getTotalCarbs() {
        return this.food.reduce((total, current)=>{
            return total + current.carbs;
        }, 0);
    }
    getTotalProtein() {
        return this.food.reduce((total, current)=>{
            return total + current.protein;
        }, 0);
    }
    getTotalFat() {
        return this.food.reduce((total, current)=>{
            return total + current.fat;
        }, 0);
    }
    getTotalCalories() {
        return this.getTotalCarbs() * 4 + this.getTotalProtein() * 4 + this.getTotalFat() * 9;
    }
}







const $4fa36e821943b400$var$API = new (0, $5b78002761577cc4$export$2e2bcd8739ae039)("https://nutrition-logger-4a682-default-rtdb.firebaseio.com/");
const $4fa36e821943b400$var$appData = new (0, $441ed6e1c4756e31$export$2e2bcd8739ae039)();
const $4fa36e821943b400$var$firebaseConfig = {
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
const $4fa36e821943b400$var$app = (0, $8rQ4N$firebaseapp.initializeApp)($4fa36e821943b400$var$firebaseConfig);
// Initialize Cloud Firestore
const $4fa36e821943b400$var$db = (0, $8rQ4N$firebasefirestore.getFirestore)($4fa36e821943b400$var$app);
// Initialize Analytics
const $4fa36e821943b400$var$analytics = (0, $8rQ4N$firebaseanalytics.getAnalytics)($4fa36e821943b400$var$app);
const $4fa36e821943b400$var$list = document.querySelector("#food-list");
const $4fa36e821943b400$var$form = document.querySelector("#create-form");
const $4fa36e821943b400$var$name = document.querySelector("#create-name");
const $4fa36e821943b400$var$carbs = document.querySelector("#create-carbs");
const $4fa36e821943b400$var$protein = document.querySelector("#create-protein");
const $4fa36e821943b400$var$fat = document.querySelector("#create-fat");
const $4fa36e821943b400$var$displayEntry = (name, carbs, protein, fat)=>{
    $4fa36e821943b400$var$appData.addFood(carbs, protein, fat);
    $4fa36e821943b400$var$list.insertAdjacentHTML("beforeend", `<li class="card">
        <div>
          <h3 class="name">${(0, $20b4a97a61b3fccb$export$9a00dee1beb8f576)(name)}</h3>
          <div class="calories">${(0, $20b4a97a61b3fccb$export$19ca57dbab2b06c3)(carbs, protein, fat)} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
          </ul>
        </div>
      </li>`);
};
$4fa36e821943b400$var$form.addEventListener("submit", (event)=>{
    event.preventDefault();
    $4fa36e821943b400$var$API.post("/history.json", {
        fields: {
            name: {
                stringValue: $4fa36e821943b400$var$name.value
            },
            carbs: {
                integerValue: $4fa36e821943b400$var$carbs.value
            },
            protein: {
                integerValue: $4fa36e821943b400$var$protein.value
            },
            fat: {
                integerValue: $4fa36e821943b400$var$fat.value
            }
        }
    }).then((data)=>{
        console.log(data);
        if (data.error) {
            // there was an error
            (0, ($parcel$interopDefault($8rQ4N$snackbar))).show("Some data is missing.");
            return;
        }
        (0, ($parcel$interopDefault($8rQ4N$snackbar))).show("Food added successfully.");
        $4fa36e821943b400$var$displayEntry($4fa36e821943b400$var$name.value, $4fa36e821943b400$var$carbs.value, $4fa36e821943b400$var$protein.value, $4fa36e821943b400$var$fat.value);
        $4fa36e821943b400$var$render();
        $4fa36e821943b400$var$name.value = "";
        $4fa36e821943b400$var$carbs.value = "";
        $4fa36e821943b400$var$protein.value = "";
        $4fa36e821943b400$var$fat.value = "";
    });
});
const $4fa36e821943b400$var$init = ()=>{
    $4fa36e821943b400$var$API.get("/history.json?pageSize=100").then((data)=>{
        data?.documents?.forEach((doc)=>{
            const fields = doc.fields;
            $4fa36e821943b400$var$displayEntry(fields.name.stringValue, fields.carbs.integerValue, fields.protein.integerValue, fields.fat.integerValue);
        });
        $4fa36e821943b400$var$render();
    });
};
let $4fa36e821943b400$var$chartInstance = null;
const $4fa36e821943b400$var$renderChart = ()=>{
    $4fa36e821943b400$var$chartInstance?.destroy();
    const context = document.querySelector("#app-chart").getContext("2d");
    $4fa36e821943b400$var$chartInstance = new (0, ($parcel$interopDefault($8rQ4N$chartjsauto)))(context, {
        type: "bar",
        data: {
            labels: [
                "Carbs",
                "Protein",
                "Fat"
            ],
            datasets: [
                {
                    label: "Macronutrients",
                    data: [
                        $4fa36e821943b400$var$appData.getTotalCarbs(),
                        $4fa36e821943b400$var$appData.getTotalProtein(),
                        $4fa36e821943b400$var$appData.getTotalFat()
                    ],
                    backgroundColor: [
                        "#25AEEE",
                        "#FECD52",
                        "#57D269"
                    ],
                    borderWidth: 3
                }
            ]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    });
};
const $4fa36e821943b400$var$totalCalories = document.querySelector("#total-calories");
const $4fa36e821943b400$var$updateTotalCalories = ()=>{
    $4fa36e821943b400$var$totalCalories.textContent = $4fa36e821943b400$var$appData.getTotalCalories();
};
const $4fa36e821943b400$var$render = ()=>{
    $4fa36e821943b400$var$renderChart();
    $4fa36e821943b400$var$updateTotalCalories();
};
$4fa36e821943b400$var$init();


//# sourceMappingURL=main.js.map
