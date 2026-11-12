// 2. ARRAYS - Store multiple records, not individual variables
let expenses = [
  { name: "Groceries", category: "Food", amount: 2500 },
  { name: "Transport", category: "Transport", amount: 1200 },
  { name: "Rent", category: "Rent", amount: 8000 }
];

const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalEl = document.getElementById("total");
const statusEl = document.getElementById("status");
const messageEl = document.getElementById("message");

// 4. DOM MANIPULATION + 3. LOOPS - Update dashboard dynamically
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  // LOOP 1: for loop to calculate total
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }

  // LOOP 2: forEach loop to display each record
  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.category}</td>
      <td>KSh ${expense.amount}</td>
      <td><button onclick="deleteExpense(${index})">Delete</button></td>
    `;
    expenseList.appendChild(row);
  });

  totalEl.textContent = total;

  // 1. DECISION MAKING - Conditionals for budgeting feedback
  if (total === 0) {
    statusEl.textContent = "No expenses yet. Add one above.";
  } else if (total < 5000) {
    statusEl.textContent = "✅ Good! You are spending wisely.";
  } else if (total < 10000) {
    statusEl.textContent = "⚠️ Warning! You are approaching your budget limit.";
  } else {
    statusEl.textContent = "🚨 Over budget! Cut down on spending.";
  }
}

// 5. EVENT LISTENERS - Handle user interactions
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  // Conditional: Validation
  if (name === "" || amount <= 0) {
    messageEl.textContent = "Please enter a valid name and amount.";
    return;
  }

  // 6. CONNECT EVERYTHING: Form -> Array -> Loop -> DOM
  expenses.push({ name, category, amount });
  renderExpenses();
  messageEl.textContent = `${name} added successfully!`;
  form.reset();
});

document.getElementById("clearBtn").addEventListener("click", function() {
  if (expenses.length === 0) {
    messageEl.textContent = "List is already empty.";
  } else {
    expenses = [];
    renderExpenses();
    messageEl.textContent = "All expenses cleared.";
  }
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

renderExpenses();