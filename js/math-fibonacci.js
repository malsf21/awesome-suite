function recursiveFibonacci(n) {
    if(n <= 2) {
        return 1;
    } else {
        return this.recursiveFibonacci(n - 1) + this.recursiveFibonacci(n - 2);
    }
};

function loopingFibonacci(n) {
    var a = 0;
    var b = 1;
    var f = 1;
    for(var i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
    }
    return f;
};


function loopingFibonacciTotal(n) {
    var a = 0;
    var b = 1;
    var f = 1;
    var output = [];
    for(var i = 2; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
        output[i-2] = f;
    }
    return output.toString();
};
