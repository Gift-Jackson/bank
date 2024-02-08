const digit = document.querySelector(".digit")
const input = document.querySelector(".input-box input")
const withdrawBtn = document.querySelector(".withdrawBtn")
const depositBtn = document.querySelector(".depositBtn")
const historyItems = document.querySelector(".history-items")
const toast = document.querySelector(".toast")
const amountText = document.querySelectorAll(".fund")

let currentAmount = 2000;
digit.textContent = currentAmount

const withdraw = () => {
    const withdrawalAmount = parseInt(input.value);
    if (input.value === "") {
        input.classList.add("error")
        toast.classList.add("is-active")
        toast.textContent = "Input an amount first!"
        setTimeout(() => {
            toast.classList.remove("is-active")
            input.classList.remove("error")
        }, 3000)
    }
    else if (withdrawalAmount > currentAmount) {
        toast.textContent = "Insuffient funds!"
        input.classList.add("error")
        toast.classList.add("is-active")
        setTimeout(() => {
            toast.classList.remove("is-active")
            input.classList.remove("error")
        }, 3000)
        
    } else {
        currentAmount -= withdrawalAmount;
        digit.textContent = currentAmount;
        let amount = input.value;
        let type = "withdrawal";
        history(amount, type);
    }
    input.value = "";
    amountText.forEach(element => {
        element.querySelector("span").classList.remove("green");
        element.querySelector("span").classList.add("red");
    });
}

const deposit = () => {
    if (input.value === "") {
        toast.classList.add("is-active")
        input.classList.add("error")
        toast.textContent = "Input an amount first!"
        setTimeout(() => {
            toast.classList.remove("is-active")
            input.classList.remove("error")
        }, 3000)
    }
    else {
        currentAmount += parseInt(input.value);
        digit.textContent = currentAmount;
        let amount = input.value;
        let type = "Deposit";
        history(amount, type);
    }

    input.value = "";
    amountText.forEach(element => {
        element.querySelector("span").classList.remove("red");
        element.querySelector("span").classList.add("green");
    });

}

const text = document.querySelector(".text")


const history = (amount, type) => {

    if (historyItems.length === 0) {
        text.style.display = "block"
    }
    else {
        text.style.display = "none"
        const markup = `
        <li class="history-box">
            <div class="type">${type}</div>
            <div class="fund"><span>$</span><span class="amount">${amount}</span></div>
        </li>
    `;

        historyItems.insertAdjacentHTML('afterbegin', markup);
    }
}

withdrawBtn.addEventListener('click', withdraw);
depositBtn.addEventListener('click', deposit);
