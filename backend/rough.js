// Variables
let name = "Faizan";
const age = 22;

// Function
function greet(name) {
    return `Hello ${name}`;
}

// Arrow Function
const add = (a, b) => a + b;

// Array
const nums = [1, 2, 3, 4, 5];

nums.forEach(num => console.log(num));

const doubled = nums.map(num => num * 2);

const even = nums.filter(num => num % 2 === 0);

// Object
const user = {
    name: "Faizan",
    age: 22,
    greet() {
        console.log("Hello");
    }
};

// Destructuring
const { name: userName, age: userAge } = user;

// Promise
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data received"), 1000);
    });
};

// Async/Await
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

// Classes
class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, ${this.name}`);
    }
}

const p1 = new Person("Faizan");
p1.sayHello();

// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

// Rest Operator
function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4));