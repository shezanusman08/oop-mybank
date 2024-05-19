#! /usr/bin/env node
import inquirer from "inquirer";
// step:2 bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // debit money
    withDraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Successfully withdraw: Rs: ${amount}`);
            console.log(`Your remaining is: Rs: ${this.balance}`);
        }
        else {
            console.log("Insufficient Balance!");
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 1000) {
            amount -= 10; //10 rs will be charge if user deposit more than 1000 rupees
        }
        this.balance += amount;
        console.log(`Rs: ${amount} Deposited.`);
        console.log(`New Balance is Rs :${this.balance}`);
    }
    // check balance
    checkBalance() {
        console.log(`Current balance: Rs: ${this.balance}`);
    }
}
// custumer class
class Customer {
    firtsName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firtsName, lastName, gender, age, mobileNumber, account) {
        this.firtsName = firtsName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// -------------------- CLASS IS COMPLETE HERE--------------------------
// step3: create bank accounts
const accounts = [
    new BankAccount(1001, 25000),
    new BankAccount(1002, 50000),
    new BankAccount(1003, 100000),
];
// Create customers
const customers = [
    new Customer("Shezan", "Usman", "Male", 20, 11111111111, accounts[0]),
    new Customer("new", "member1", "Male", 20, 2222222222, accounts[1]),
    new Customer("new", "member2", "Male", 20, 33333333333, accounts[2])
];
// step4: fuction to interact with bank accounts
async function services() {
    do {
        const accNumInput = await inquirer.prompt({
            name: "accNum",
            type: "number",
            message: "Enter Your Account Number"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accNumInput.accNum);
        if (customer) {
            console.log(`Hey Welcome! ${customer.firtsName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select what would you like to do!",
                    choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
                }]);
            // Step5: impliment 
            switch (ans.select) {
                case "Deposite":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter amount to Withdraw:"
                    });
                    customer.account.withDraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting My Bank.....");
                    console.log("Thankyou for using our services, GOOD DAY!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Try again!");
        }
    } while (true);
}
services();
