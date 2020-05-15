//----------------------- BUDGET CALCULATIONS --------------------
class Budget {
  constructor(budget,incomeItems, expenseItems){
    this.budget = 0;
    this.incomeTotal = 0;
    this.expenseTotal = 0;
    this.incomeItems = [];
    this.expenseItems = [];
  }

  //Getters and Setters
  getBudget(){
    return this.budget;
  }

  setBudget(newBudget){
    this.budget = newBudget;
  }

  addIncome(income){
    this.incomeItems.push(income);
  }

  addExpense(expense){
    this.expenseItems.push(expense);
  }

  getIncomeItems() {
    return this.incomeItems;
  }

  setIncomeItems(newIncome) {
    this.incomeItems = newIncome;
  }

  getExpenseItems() {
    return this.expenseItems;
  }

  setExpenseItems(newExpense) {
    this.expenseItems = newExpense;
  }

  getIncomeSize() {
    return this.incomeItems.length;
  }

  getExpenseSize() {
    return this.expenseItems.length;
  }

  getIncomeTotal() {
    return this.incomeTotal;
  }

  getExpenseTotal() {
    return this.expenseTotal;
  }

  //Calculation methods
  incomeTotalAdd(income) {
    this.incomeTotal += income.getIncomeValue();
    this.budget += income.getIncomeValue();
  }

  incomeTotalSubtract(income){
    this.incomeTotal -= income.getIncomeValue();
    this.budget -= income.getIncomeValue();
  }

  expenseTotalAdd(expense) {
    this.expenseTotal += expense.getExpenseValue();
    this.budget -= expense.getExpenseValue();
  }

  expenseTotalSubtract(expense){
    this.expenseTotal -= expense.getExpenseValue();
    this.budget += expense.getExpenseValue();
  }

  calculateBudget(item){
    //not supposed to add total
    this.budget += this.incomeTotal;
    this.budget -= this.expenseTotal;
  }
}

class Income {
  constructor(incomeValue, id){
    this.incomeValue = incomeValue;
    this.id = id;
  }

  getIncomeValue() {
    return this.incomeValue;
  }

  getId() {
    return this.id;
  }
}

class Expense {
  constructor(expenseValue, id){
    this.expenseValue = expenseValue;
    this.id = id;
  }

  getExpenseValue() {
    return this.expenseValue;
  }

  getId() {
    return this.id;
  }
}

//------------------------- UI CONTROL ---------------------------
class UIController
{

  //adding expenses
  static addExpenses(expense) {
    let budgetTotal = budget.getBudget();
    let item = document.createElement("div");
    item.id = expense.getId();
    item.classList = "item clearfix";
    item.innerHTML = `
      <div class="item__description">${selectors.description.value}</div>
      <div class="right clearfix">
          <div class="item__value">- ${expense.getExpenseValue()}</div>
          <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
    `;

    selectors.expense_list.appendChild(item);
  }

  //adding income
  static addIncome(income) {
    let item = document.createElement("div");
    item.classList = "item clearfix";
    item.id  = income.getId();
    item.innerHTML = `
      <div class="item__description">${selectors.description.value}</div>
      <div class="right clearfix">
          <div class="item__value">+ ${income.getIncomeValue()}</div>
          <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
    `;

    selectors.income_list.appendChild(item);
  }

  //delete Expense
  static deleteExpense(id){
    let delElem = document.getElementById(id);
    delElem.parentNode.removeChild(delElem);
  }

  //delete Income
  static deleteIncome(id) {
    let delElem = document.getElementById(id);
    delElem.parentNode.removeChild(delElem);
  }

  //Adding incomeValue to incomeTotal in UI
  static updateIncome(income) {
    budget.incomeTotalAdd(income);
    let total_income = budget.getIncomeTotal();
    let budgetTotal = budget.getBudget();

    if(budgetTotal === 0){
      selectors.budget_value.textContent = budgetTotal;
    }
    else if(budgetTotal > 0){
      selectors.budget_value.textContent = "+ " + budgetTotal;
    }
    else {
      selectors.budget_value.textContent = "- " + budgetTotal;
    }

    selectors.income_value.textContent = "+ " + total_income;
  }

  //Updating income value when income has been deleted
  static updateIncomeSub(income){
    budget.incomeTotalSubtract(income);
    let total_income = budget.getIncomeTotal();
    let budgetTotal = budget.getBudget();

    if(budgetTotal === 0){
      selectors.budget_value.textContent = budgetTotal;
    }
    else if(budgetTotal > 0){
      selectors.budget_value.textContent = "+ " + budgetTotal;
    }
    else {
      selectors.budget_value.textContent = "- " + budgetTotal;
    }

    if(total_income === 0){
      selectors.income_value.textContent = total_income;
    }
    else {
      selectors.income_value.textContent = "+ " +total_income;
    }
  }

  //Adding expenseValue to expenseTotal in UI
  static updateExpenses(expense) {
    budget.expenseTotalAdd(expense);
    let total_expense = budget.getExpenseTotal();
    let budgetTotal = budget.getBudget();

    if(budgetTotal === 0){
      selectors.budget_value.textContent = budgetTotal;
    }
    else if(budgetTotal > 0){
      selectors.budget_value.textContent = "+ " + budgetTotal;
    }
    else {
      selectors.budget_value.textContent = "- " + budgetTotal;
    }

    selectors.expense_value.textContent ="- " + total_expense;
  }

  //updating expense value when expense has been deleted
  static updateExpenseSub(income){
    budget.expenseTotalSubtract(income);
    let total_expense = budget.getExpenseTotal();
    let budgetTotal = budget.getBudget();

    if(budgetTotal === 0){
      selectors.budget_value.textContent = budgetTotal;
    }
    else if(budgetTotal > 0){
      selectors.budget_value.textContent = "+ " + budgetTotal;
    }
    else {
      selectors.budget_value.textContent = "- " + budgetTotal;
    }

    if(total_expense === 0){
      selectors.expense_value.textContent = total_expense;
    }
    else {
      selectors.expense_value.textContent ="- " + total_expense;
    }
  }

  //display Date
  static displayDate(month){
    if(month === 1){
      selectors.date.textContent = "January";
    }
    else if(month === 2){
      selectors.date.textContent = "February";
    }
    else if(month === 3){
      selectors.date.textContent = "March";
    }
    else if(month === 4){
      selectors.date.textContent = "April";
    }
    else if(month === 5){
      selectors.date.textContent = "May";
    }
    else if(month === 6){
      selectors.date.textContent = "June";
    }
    else if(month === 7){
      selectors.date.textContent = "July";
    }
    else if(month === 8){
      selectors.date.textContent = "August";
    }
    else if(month === 9){
      selectors.date.textContent = "September";
    }
    else if(month === 10){
      selectors.date.textContent = "October";
    }
    else if(month === 11){
      selectors.date.textContent = "November";
    }
    else {
      selectors.date.textContent = "December";
    }

  }
}

// ------------------ GLOBAL CONTROL ---------------------------
//Initialization
let budget = new Budget();

//Selectors
let selectors = {
  add_btn: document.querySelector(".add__btn"),
  add_type: document.querySelector(".add__type"),
  description: document.querySelector(".add__description"),
  add_value: document.querySelector(".add__value"),
  expense_list: document.querySelector(".expenses__list"),
  income_list: document.querySelector(".income__list"),
  container: document.querySelector(".container"),
  date: document.querySelector(".budget__title--month"),
  budget_value : document.querySelector(".budget__value"),
  income_value: document.querySelector(".budget__income--value"),
  expense_value: document.querySelector(".budget__expenses--value")
};

//Event Listners
//Window loaded
window.addEventListener('load',(e) => {
  //getting the date
  let date = new Date();
  UIController.displayDate(date.getMonth() +1);
});
//Adding
selectors.add_btn.addEventListener("click",() =>{
  if(selectors.add_type.value === "inc"){
    incomeVal = selectors.add_value.value;
    incomeVal = parseInt(incomeVal,10);
    incomeId = "income-" + budget.getIncomeSize();
    let income = new Income(incomeVal, incomeId);
    budget.addIncome(income);
    UIController.addIncome(income);
    UIController.updateIncome(income);
  }

  if(selectors.add_type.value === "exp"){
    expenseVal = selectors.add_value.value;
    expenseVal = parseInt(expenseVal,10);
    expenseId = "expense-" +budget.getExpenseSize();
    let expense = new Expense(expenseVal,expenseId);
    budget.addExpense(expense);
    UIController.addExpenses(expense);
    UIController.updateExpenses(expense);
  }
});

document.addEventListener("keypress",(e) => {
  if(e.keyCode === 13 || e.which ===  13){
    if(selectors.add_type.value === "inc"){
      incomeVal = selectors.add_value.value;
      incomeVal = parseInt(incomeVal,10);
      incomeId = "income-" + budget.getIncomeSize();
      let income = new Income(incomeVal, incomeId);
      budget.addIncome(income);
      UIController.addIncome(income);
      UIController.updateIncome(income);
    }

    if(selectors.add_type.value === "exp"){
      expenseVal = selectors.add_value.value;
      expenseVal = parseInt(expenseVal,10);
      expenseId = "expense-" +budget.getExpenseSize();
      let expense = new Expense(expenseVal,expenseId);
      budget.addExpense(expense);
      UIController.addExpenses(expense);
      UIController.updateExpenses(expense);
    }
  }
});
//Removing
selectors.container.addEventListener("click", (e) => {
  //event delegation
  let element = e.target.parentNode.parentNode.parentNode.parentNode;

  if(element !== null){
    //element is in income
    if(element.parentNode.className === "income__list"){
      income_array = budget.getIncomeItems();
      let id = element.id.slice(7);
      id = parseInt(id,10);
      let removedElem = income_array[id];
      income_array.splice(id,1);
      budget.setIncomeItems = income_array;
      UIController.deleteIncome(element.id);
      UIController.updateIncomeSub(removedElem);
    }

    //element is an expense
    else if(element.parentNode.className === "expenses__list"){
      expense_array = budget.getExpenseItems();
      let id = element.id.slice(8);
      id = parseInt(id,10);
      let removedElem = expense_array[id];
      expense_array.splice(id,1);
      budget.setExpenseItems = expense_array;
      UIController.deleteExpense(element.id);
      UIController.updateExpenseSub(removedElem);
    }
  }

});
