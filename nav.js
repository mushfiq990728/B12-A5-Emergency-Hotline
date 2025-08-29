// Navbar counts
let heartCount = 0;
let coinCount = 100; // starting coins
document.getElementById("heart-count").innerText = heartCount;
document.getElementById("coin-count").innerText = coinCount;

// Heart Buttons
const hearts = document.querySelectorAll(".heart-btn");
hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heartCount++;
    document.getElementById("heart-count").innerText = heartCount;
  });
});

// Copy Buttons
const copyBtns = document.querySelectorAll(".copy-btn");
copyBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const serviceNumber = e.currentTarget.dataset.number; // get number from data-number
    navigator.clipboard.writeText(serviceNumber);
    alert(`Copied ${serviceNumber} to clipboard!`);
    
    // Increase copy count
    let copyCountElem = document.getElementById("copy-count");
    if(copyCountElem){
        copyCountElem.innerText = parseInt(copyCountElem.innerText) + 1;
    }
  });
});

// Call Buttons
const callBtns = document.querySelectorAll(".call-btn");
const callHistoryContainer = document.getElementById("call-history");

callBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.currentTarget.closest(".card");
    const serviceName = card.querySelector("h1").innerText;
    const serviceNumber = card.querySelector(".text p:last-child").innerText;

    if (coinCount < 20) {
      alert("Not enough coins to make a call!");
      return;
    }

    coinCount -= 20;
    document.getElementById("coin-count").innerText = coinCount;

    alert(`Calling ${serviceName} at number ${serviceNumber}`);

    // Add to call history
    const time = new Date();
    const formattedTime = time.toLocaleTimeString();
    const historyItem = document.createElement("div");
    historyItem.classList.add("flex", "items-center", "justify-between", "bg-gray-50", "rounded-lg", "p-3", "shadow-sm");
    historyItem.innerHTML = `
      <div>
        <h3 class="font-medium">${serviceName}</h3>
        <p class="text-sm text-gray-500">${serviceNumber}</p>
      </div>
      <span class="text-sm text-gray-500">${formattedTime}</span>
    `;
    callHistoryContainer.prepend(historyItem);
  });
});

// Clear History
document.getElementById("clear-history").addEventListener("click", () => {
  callHistoryContainer.innerHTML = "";
});
