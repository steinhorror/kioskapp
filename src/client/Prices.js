class Prices {
    obj = [];
    constructor() {}
    setAll(json) {
        if(typeof json == "string") json = JSON.parse(json);
        if(json == undefined) throw Error("Wrong Arguments supplied!");
        // Object.keys(json).forEach((i) => {
        //     Object.keys(json[i]).forEach(j => {
        //         this.obj.push({ name: j, price: json[i][j], amount: 1})
        //     })
        // })
        this.obj = json;
    }
    getFromName(name) {
        return this.obj.find(m => m.name == name);
    }
    setItem(name, val) {
        this.obj[this.obj.indexOf(m => m.name == name)] = val;
        return val;
    }
    changeItem(name, val) {
        if(val.length > 0) {
            val.forEach(e => {
                this.obj[this.obj.indexOf(m => m.name == name)][e.name] = e.val;
            })
            return this.obj.find(m => m.name);
        }
        this.obj[this.obj.indexOf(m => m.name == name)][val.name] = val.val;
        return this.obj.find(m => m.name);
    }
    /**
     * Returns all Items
     * @returns {Array<Object>}
     */
    getAll() {
        return this.obj
    }
}

export { Prices };