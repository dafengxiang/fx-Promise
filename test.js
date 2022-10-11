const {FPromise} = require('./FPromise')

console.log('第一步')
const fPromise = new FPromise((resolve, reject) => {
    console.log('第二步')
    setTimeout(() => {
        resolve(111)
    })
})
fPromise.then(
    (result) => console.log(result),
    (result) => console.log(result.message)
)
console.log('第三步')