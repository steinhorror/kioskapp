import codemapping from "./codemapping.json";

class Scanner {
    string = "";
    cb = () => {};
    onkeyup = (ev) => {
        if (ev.key == "Shift") return;
        if (ev.key != "Enter") {
            return this.string += ev.key;
        }
        this.cb(codemapping[this.string] != undefined ? "add " + codemapping[this.string] : functionmap[this.string])
        return this.string = ""
    }
    toname(code) {
        return codemapping[code];
    }
}

let functionmap = {
    a: "pay 1",
    b: "pay 2",
    c: "pay 5",
    d: "pay 10",
    e: "pay 20",
    f: "pay 50",
    g: "pay 100",
    h: "pay 200",
    "4260028016292": "pay 500",
    j: "pay 1000",
    k: "pay 2000"
}

export { Scanner }