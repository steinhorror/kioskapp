class Kasse {
    _obj;
    maxcontent;
    constructor(obj) {
        this.maxcontent = false;
        this._obj = [
            { value: 1, amount: 20 },
            { value: 2, amount: 20 },
            { value: 5, amount: 20 },
            { value: 10, amount: 20 },
            { value: 20, amount: 20 },
            { value: 50, amount: 20 },
            { value: 100, amount: 20 },
            { value: 200, amount: 20 },
            { value: 500, amount: 20 },
            { value: 1000, amount: 20 },
            { value: 2000, amount: 20 }
        ]
    }
    getRuckgeld(total, gegeben) {
        let kassentotal = this._obj.map(m => m.amount * m.value).reduce((p, c) => p + c);
        let change = gegeben * 100 - total * 100;
        let returnelems = [];
        if (this.maxcontent && change >= kassentotal) return "INSUFFICIENT_FUNDS";

        this._obj.sort((a, b) => a.value - b.value).reverse();
        for (let elem of this._obj) {
            let amt = 0;
            while (change >= elem.value && (elem.amount > 0 || !this.maxcontent)) {
                amt++;
                if(!this.maxcontent) elem.amount--;
                change -= elem.value;
            }
            if (amt > 0) returnelems.push({ value: elem.value, amount: amt });
        }
        if (change > 0) return "INSUFFICIENT_FUNDS";
        returnelems = returnelems.map(m => { return { value: (m.value / 100), amount: m.amount } });
        return returnelems;
    }
}

export { Kasse }