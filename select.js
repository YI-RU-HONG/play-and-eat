let selectedFoods = [];

const selectSound = new Audio("select.mp3"); 
const buttonSound = new Audio("button.mp3"); 

const foodItems = document.querySelectorAll(".food-item");

foodItems.forEach(item => {
    item.addEventListener("click", () => {
        selectSound.currentTime = 0; // 重置音效，確保每次點擊都能播放
        selectSound.play(); // 播放點擊音效
    });
});

document.getElementById("confirm-selection").addEventListener("click", 
    function(){window.location.href = "select.html";
        buttonSound.currentTime = 0;
        buttonSound.play();
    }) ;

    foodItems.forEach(foodItem => {
        foodItem.addEventListener("click", function() {
            let foodName = this.dataset.food;
            let foodImage = this.querySelector(".food");
    
            
            // 如果已經選過該食物，則取消選擇
            if (selectedFoods.includes(foodName)) {
                selectedFoods = selectedFoods.filter(f => f !== foodName);
            } else {
                // 如果已經選擇了兩個，則移除最早的選擇
                if (selectedFoods.length === 2) {
                    let removedFood = selectedFoods.shift(); // 刪除最早的選擇
                    let removedImage = document.querySelector(`.food-item[data-food="${removedFood}"] .food`);
                    if (removedImage) removedImage.classList.remove("selected");
                }
                selectedFoods.push(foodName);
            }
    
            // 更新 UI 標記
            updateSelectionUI();
        });
    });
    
    function updateSelectionUI() {
        document.querySelectorAll(".food-item").forEach(foodItem => {
            let foodName = foodItem.dataset.food;
            let foodImage = foodItem.querySelector(".food");
            let label = foodItem.querySelector(".choice-label");
    
            if (selectedFoods.includes(foodName)) {
                let position = selectedFoods.indexOf(foodName) + 1;
                foodImage.classList.add("selected"); // **讓圖片本身加上選中樣式**
                label.textContent = position === 1 ? "1st" : "2nd";
            } else {
                foodImage.classList.remove("selected");
                label.textContent = "";
            }
        });
    
        // 啟用「確認選擇」按鈕
        document.getElementById("confirm-selection").disabled = selectedFoods.length !== 2;
    }
    
    document.getElementById("confirm-selection").addEventListener("click", function() {
        if (selectedFoods.length === 2) {
            localStorage.setItem("playerX", selectedFoods[0]);
            localStorage.setItem("playerO", selectedFoods[1]);
            window.location.href = "game.html";
        }
    });