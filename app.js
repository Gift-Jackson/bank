const digit = document.querySelector(".digit")
const input = document.querySelector(".input-box input")
const withdrawBtn = document.querySelector(".withdrawBtn")
const depositBtn = document.querySelector(".depositBtn")
const historyItems = document.querySelector(".history-items")
const text = document.querySelector(".text")
const toast = document.querySelector(".toast")
const amountText = document.querySelectorAll(".amount")


let currentAmount = 5000;

// Setting currency
const f = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
})
digit.textContent = f.format(currentAmount);


// handles withdrawal
const withdraw = () => {
    const withdrawalAmount = parseInt(input.value);

    // validate the input field
    if (input.value === "") {
        input.classList.add("error")
        toast.classList.add("is-active")
        toast.textContent = "Input an amount first!"
        setTimeout(() => {
            toast.classList.remove("is-active")
            input.classList.remove("error")
        }, 3000)
    }

    // Checking the withdrawal amount
    else if (withdrawalAmount > currentAmount) {
        toast.textContent = "Insuffient funds!"
        input.classList.add("error")
        toast.classList.add("is-active")
        setTimeout(() => {
            toast.classList.remove("is-active")
            input.classList.remove("error")
        }, 3000)
    }

    // successful withdrawal
    else {
        currentAmount -= withdrawalAmount;
        digit.textContent = f.format(currentAmount);
        let amount = f.format(input.value);
        let type = "withdrawal";
        history(amount, type);
    }

    // clear input field after execution
    input.value = "";
}


// Handles deposit
const deposit = () => {

    // validate the input field
    if (input.value === "") {
        toast.classList.add("is-active")
        input.classList.add("error")
        toast.textContent = "Input an amount first!"
        setTimeout(() => {
            toast.classList.remove("is-active")
            input.classList.remove("error")
        }, 3000)
    }

    // successful deposit
    else {
        currentAmount += parseInt(input.value);
        digit.textContent = f.format(currentAmount);
        let amount = f.format(input.value);
        let type = "Deposit";
        history(amount, type);
    }

    // clear input field after execution
    input.value = "";

}


// Handles transaction history
const history = (amount, type) => {

    if (historyItems.length === 0) {
        text.style.display = "block"
    }
    else {
        text.style.display = "none"
        const markup = `
        <li class="history-box">
            <div class="type">${type}</div>
            <div class="fund"><span class="amount">${amount}</span></div>
        </li>
    `;

        historyItems.insertAdjacentHTML('afterbegin', markup);
        colorID(type);
    }
}


// Handles the color ID but some reason, its not working
const colorID = (type) => {
    console.log("Transaction Type:", type);
    if (type === "Deposit") {
        amountText.forEach(element => {
            console.log("Adding Green Class");
            element.classList.add("green");
            element.classList.remove("red");
        });

    }
    else{
        amountText.forEach(element => {
            console.log("Adding Red Class");
            element.classList.remove("green");
            element.classList.add("red");
        });
    }

}



// Onclick events
withdrawBtn.addEventListener('click', withdraw);
depositBtn.addEventListener('click', deposit);