function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

const result = numbers.reverse().map(num => {
    if (isPrime(num)) return ""; 
    if (num % 3 === 0 && num % 5 === 0) return "FooBar";
    if (num % 3 === 0) return "Foo";
    if (num % 5 === 0) return "Bar";
    return num.toString();
}).filter(item => item !== ""); 


console.log(result.join(" "));
