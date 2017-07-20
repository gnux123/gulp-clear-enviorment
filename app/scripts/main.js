console.log("Hello World!!!");

var HelloWorld = ()=>{
    console.log("Hello es6!!!~");
};

HelloWorld();

async function wait(data) {
  return new Promise((resolve, reject) => {
    setTimeout(v => resolve(data), 1000);
  })
}

(async function() {
  let res = await wait('test');
  console.log(res);
})();
console.log('start')

let aTest = 1111;

aTest = 12;