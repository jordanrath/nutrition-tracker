import $h0jcB$snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import {initializeApp as $h0jcB$initializeApp} from "firebase/app";
import {getFirestore as $h0jcB$getFirestore} from "firebase/firestore";
import {getAnalytics as $h0jcB$getAnalytics} from "firebase/analytics";
import $h0jcB$chartjsauto from "chart.js/auto";

class $3f334bd1263ff8ca$export$2e2bcd8739ae039 {
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


const $bc68805842a7be7a$export$9a00dee1beb8f576 = (word)=>{
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
};
const $bc68805842a7be7a$export$19ca57dbab2b06c3 = (carbs = 0, protein = 0, fat = 0)=>{
    return carbs * 4 + protein * 4 + fat * 9;
};



class $416c5097d94f43f2$export$2e2bcd8739ae039 {
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







const $cf838c15c8b009ba$var$API = new (0, $3f334bd1263ff8ca$export$2e2bcd8739ae039)("https://nutrition-logger-4a682-default-rtdb.firebaseio.com/");
const $cf838c15c8b009ba$var$appData = new (0, $416c5097d94f43f2$export$2e2bcd8739ae039)();
const $cf838c15c8b009ba$var$firebaseConfig = {
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
const $cf838c15c8b009ba$var$app = (0, $h0jcB$initializeApp)($cf838c15c8b009ba$var$firebaseConfig);
// Initialize Cloud Firestore
const $cf838c15c8b009ba$var$db = (0, $h0jcB$getFirestore)($cf838c15c8b009ba$var$app);
// Initialize Analytics
const $cf838c15c8b009ba$var$analytics = (0, $h0jcB$getAnalytics)($cf838c15c8b009ba$var$app);
const $cf838c15c8b009ba$var$list = document.querySelector("#food-list");
const $cf838c15c8b009ba$var$form = document.querySelector("#create-form");
const $cf838c15c8b009ba$var$name = document.querySelector("#create-name");
const $cf838c15c8b009ba$var$carbs = document.querySelector("#create-carbs");
const $cf838c15c8b009ba$var$protein = document.querySelector("#create-protein");
const $cf838c15c8b009ba$var$fat = document.querySelector("#create-fat");
const $cf838c15c8b009ba$var$displayEntry = (name, carbs, protein, fat)=>{
    $cf838c15c8b009ba$var$appData.addFood(carbs, protein, fat);
    $cf838c15c8b009ba$var$list.insertAdjacentHTML("beforeend", `<li class="card">
        <div>
          <h3 class="name">${(0, $bc68805842a7be7a$export$9a00dee1beb8f576)(name)}</h3>
          <div class="calories">${(0, $bc68805842a7be7a$export$19ca57dbab2b06c3)(carbs, protein, fat)} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
          </ul>
        </div>
      </li>`);
};
$cf838c15c8b009ba$var$form.addEventListener("submit", (event)=>{
    event.preventDefault();
    $cf838c15c8b009ba$var$API.post("/history.json", {
        fields: {
            name: {
                stringValue: $cf838c15c8b009ba$var$name.value
            },
            carbs: {
                integerValue: $cf838c15c8b009ba$var$carbs.value
            },
            protein: {
                integerValue: $cf838c15c8b009ba$var$protein.value
            },
            fat: {
                integerValue: $cf838c15c8b009ba$var$fat.value
            }
        }
    }).then((data)=>{
        console.log(data);
        if (data.error) {
            // there was an error
            (0, $h0jcB$snackbar).show("Some data is missing.");
            return;
        }
        (0, $h0jcB$snackbar).show("Food added successfully.");
        $cf838c15c8b009ba$var$displayEntry($cf838c15c8b009ba$var$name.value, $cf838c15c8b009ba$var$carbs.value, $cf838c15c8b009ba$var$protein.value, $cf838c15c8b009ba$var$fat.value);
        $cf838c15c8b009ba$var$render();
        $cf838c15c8b009ba$var$name.value = "";
        $cf838c15c8b009ba$var$carbs.value = "";
        $cf838c15c8b009ba$var$protein.value = "";
        $cf838c15c8b009ba$var$fat.value = "";
    });
});
const $cf838c15c8b009ba$var$init = ()=>{
    $cf838c15c8b009ba$var$API.get("/history.json?pageSize=100").then((data)=>{
        data?.documents?.forEach((doc)=>{
            const fields = doc.fields;
            $cf838c15c8b009ba$var$displayEntry(fields.name.stringValue, fields.carbs.integerValue, fields.protein.integerValue, fields.fat.integerValue);
        });
        $cf838c15c8b009ba$var$render();
    });
};
let $cf838c15c8b009ba$var$chartInstance = null;
const $cf838c15c8b009ba$var$renderChart = ()=>{
    $cf838c15c8b009ba$var$chartInstance?.destroy();
    const context = document.querySelector("#app-chart").getContext("2d");
    $cf838c15c8b009ba$var$chartInstance = new (0, $h0jcB$chartjsauto)(context, {
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
                        $cf838c15c8b009ba$var$appData.getTotalCarbs(),
                        $cf838c15c8b009ba$var$appData.getTotalProtein(),
                        $cf838c15c8b009ba$var$appData.getTotalFat()
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
const $cf838c15c8b009ba$var$totalCalories = document.querySelector("#total-calories");
const $cf838c15c8b009ba$var$updateTotalCalories = ()=>{
    $cf838c15c8b009ba$var$totalCalories.textContent = $cf838c15c8b009ba$var$appData.getTotalCalories();
};
const $cf838c15c8b009ba$var$render = ()=>{
    $cf838c15c8b009ba$var$renderChart();
    $cf838c15c8b009ba$var$updateTotalCalories();
};
$cf838c15c8b009ba$var$init();


//# sourceMappingURL=module.js.map
