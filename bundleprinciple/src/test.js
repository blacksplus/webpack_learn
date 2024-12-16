let obj = {}
let ageValue = 25
Object.defineProperty(obj, 'age', {
    get() {
        return ageValue
    },
    set(newValue) {
        ageValue = newValue
    }
})
console.log(obj.age) // 25
obj.age = 30
console.log(obj.age) // 30