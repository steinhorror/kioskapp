<script>
    import PriceModal from "../components/PriceModal.svelte";
    import SearchModal from "../components/SearchModal.svelte";
    import RabattModal from "../components/RabattModal.svelte";
    import Row from "../components/Row.svelte";

    export let prices;
    export let setPage;
    export let setRows = [];
    export let setRabatt;
    export let rows = [];

    let allprices = prices.getAll().map((p) => p.name);
    let modal = "none";
    let rabatt = 0;
    let pricecallback = (price) => {
        if (price == "none") return (modal = "none");
        additem({ amount: 1, product: "Manuell", price });
        calctotal();
        modal = "none";
    };
    let rabattcallback = (r) => {
        if (r == "none") return (modal = "none");
        rabatt = parseInt(r);
        setRabatt(parseInt(r));
        if (rows.find((m) => m.product == "Rabatt")) {
            rows.find((m) => m.product == "Rabatt").price = r;
            modal = "none";
            calctotal();
            return (rows = rows);
        }
        additem({ amount: "", product: "Rabatt", price: r, rabatt: true });
        calctotal();
        modal = "none";
    };
    let searchcb = (name) => {
        if (name == "none") return (modal = "none");
        additem({
            amount: 1,
            product: name,
            price: prices.getFromName(name).price,
        });
        calctotal();
        modal = "none";
    };
    let calctotal = () => {
        total = (
            rows
                .filter((r) => r.rabatt == undefined)
                .map(
                    (r) =>
                        parseFloat(r.price.toString().replace(",", ".")) *
                        r.amount *
                        100
                )
                .reduce((sum, x) => parseFloat(sum) + parseFloat(x)) / 100
        )
            .toString()
            .replace(".", ",");
        if (total.includes(",") && total.split(",")[1].length == 1)
            total += "0";
        if (rabatt != 0)
            total = (total.replace(",", ".") * (1 - rabatt / 100))
                .toPrecision(2)
                .toString()
                .replace(".", ",");
    };
    let additem = (item) => {
        if (
            rows.find((m) => m.product == item.product && m.price == item.price)
        ) {
            rows.find((m) => m.product == item.product && m.price == item.price)
                .amount++;
            return (rows = rows);
        }
        rows = [...rows, item];
        setRows(rows);
    };
    let stornierencb = () => {
        rows = [];
        setRows([]);
        total = 0;
    };
    let editmengecb = (row, item) => {
        if(item == "+") row.amount++;
        else row.amount--;
        rows = rows;
        setRows(rows);
        calctotal()
    }
    let total = 0;
</script>

<main>
    {#if modal == "price"}
        <PriceModal {pricecallback} />
    {:else if modal == "search"}
        <SearchModal {searchcb} elements={allprices} />
    {:else if modal == "rabatt"}
        <RabattModal {rabattcallback} />
    {/if}
    <div class="container">
        <div
            class="row"
            style="background-color: #DADADA;border-bottom: 2px solid black;"
        >
            <span class="text" style="text-align: start">Menge</span>
            <span class="text" style="text-align: center">Produkt</span>
            <span class="text" style="text-align: end">Preis</span>
        </div>
        {#each rows as row}
            <Row
                amount={row.amount}
                product={row.product}
                price={row.price}
                halfwidth={true}
                rabatt={row.rabatt != undefined}
                editmenge={true}
                mengecb={(item) => editmengecb(row, item)}
            />
        {/each}
    </div>
    <div class="container" style="background: #E8E8E8;">
        <span class="total">Total: {total}€</span>
        <div
            style="bottom: 16px;position: absolute;display: flex;justify-content: center;align-items: center;flex-wrap: wrap;gap: 16px;"
        >
            <div style="display: flex;gap: 16px;">
                <div
                    class="btn suchen"
                    style="background-color: #3CD1F2"
                    on:click={() => (modal = "search")}
                >
                    <span>Suchen</span>
                </div>
                <div
                    class="btn rabatt"
                    style="background-color: #FF8A00"
                    on:click={() =>
                        rows.length == 0
                            ? (modal = "none")
                            : (modal = "rabatt")}
                >
                    <span>Rabatt</span>
                </div>
            </div>
            <div style="display: flex;gap: 16px;">
                <div
                    class="btn bezahlen"
                    style="background-color: #5DE08A"
                    on:click={() => setPage("pay")}
                >
                    <span>Bezahlen</span>
                </div>
                <div
                    class="btn preis"
                    style="background-color: #FFE9BD"
                    on:click={() => (modal = "price")}
                >
                    <span>Manueller Preis</span>
                </div>
                <div
                    class="btn preis"
                    style="background-color: #fca4a7"
                    on:click={() => stornierencb()}
                >
                    <span>Stornieren</span>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .total {
        margin-top: 40px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 64px;
        line-height: 75px;
    }
    main {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .container {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .text {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 48px;
        line-height: 56px;
        width: 33%;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 50vw;
        padding: 16px;
    }
    .btn {
        width: 256px;
        height: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        font-size: 48px;
        text-align: center;
        cursor: pointer;
    }
</style>
