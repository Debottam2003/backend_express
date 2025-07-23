function one(fn) {
    setTimeout(() => {
        console.log("One");
        fn();
    }, 3000);
}
one(() => {
    console.log("Two");
});

console.log("Three");

// Three 
// One 
// Two