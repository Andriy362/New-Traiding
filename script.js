let initialBalance = 1078;
let deals = [];

function updateTable() {
    const tableBody = document.getElementById("deals-table-body");
    tableBody.innerHTML = "";

    deals.forEach((deal, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${deal.openDate}</td>
            <td>${deal.openTime}</td>
            <td>${deal.closeDate}</td>
            <td>${deal.closeTime}</td>
            <td>${deal.symbol}</td>
            <td>${deal.direction}</td>
            <td>${deal.openPrice}</td>
            <td>${deal.closePrice}</td>
            <td>${deal.commission}</td>
            <td class="${deal.result > 0 ? "profit" : deal.result < 0 ? "loss" : "neutral"}">${deal.result}</td>
            <td>${deal.comment}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editDeal(${index})">Редагувати</button>
                <button class="btn btn-danger btn-sm" onclick="deleteDeal(${index})">Видалити</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("initial-balance").innerText = initialBalance.toFixed(2);
}

function showAddDealModal() {
    document.getElementById("deal-form").reset();
    document.getElementById("modal-title").innerText = "Додати угоду";
    document.getElementById("deal-modal").style.display = "block";
    document.getElementById("deal-form").onsubmit = addDeal;
}

function closeModal() {
    document.getElementById("deal-modal").style.display = "none";
}

function addDeal(event) {
    event.preventDefault();

    const deal = {
        openDate: document.getElementById("open-date").value,
        openTime: document.getElementById("open-time").value,
        closeDate: document.getElementById("close-date").value,
        closeTime: document.getElementById("close-time").value,
        symbol: document.getElementById("symbol").value,
        direction: document.getElementById("direction").value,
        openPrice: parseFloat(document.getElementById("open-price").value),
        closePrice: parseFloat(document.getElementById("close-price").value),
        commission: parseFloat(document.getElementById("commission").value),
        result: parseFloat(document.getElementById("result").value),
        comment: document.getElementById("comment").value,
    };

    deals.push(deal);
    initialBalance += deal.result;

    updateTable();
    closeModal();
}

function editDeal(index) {
    const deal = deals[index];

    document.getElementById("open-date").value = deal.openDate;
    document.getElementById("open-time").value = deal.openTime;
    document.getElementById("close-date").value = deal.closeDate;
    document.getElementById("close-time").value = deal.closeTime;
    document.getElementById("symbol").value = deal.symbol;
    document.getElementById("direction").value = deal.direction;
    document.getElementById("open-price").value = deal.openPrice;
    document.getElementById("close-price").value = deal.closePrice;
    document.getElementById("commission").value = deal.commission;
    document.getElementById("result").value = deal.result;
    document.getElementById("comment").value = deal.comment;

    document.getElementById("modal-title").innerText = "Редагувати угоду";
    document.getElementById("deal-modal").style.display = "block";

    document.getElementById("deal-form").onsubmit = (event) => {
        event.preventDefault();

        initialBalance -= deals[index].result;

        deals[index] = {
            openDate: document.getElementById("open-date").value,
            openTime: document.getElementById("open-time").value,
            closeDate: document.getElementById("close-date").value,
            closeTime: document.getElementById("close-time").value,
            symbol: document.getElementById("symbol").value,
            direction: document.getElementById("direction").value,
            openPrice: parseFloat(document.getElementById("open-price").value),
            closePrice: parseFloat(document.getElementById("close-price").value),
            commission: parseFloat(document.getElementById("commission").value),
            result: parseFloat(document.getElementById("result").value),
            comment: document.getElementById("comment").value,
        };

        initialBalance += deals[index].result;

        updateTable();
        closeModal();
    };
}

function deleteDeal(index) {
    initialBalance -= deals[index].result;
    deals.splice(index, 1);
    updateTable();
}

// Ініціалізація
updateTable();
