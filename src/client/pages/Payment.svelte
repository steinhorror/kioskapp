<script>
    import Row from "../components/Row.svelte";
    import Gegeben from "../components/Gegeben.svelte";
    import Geld from "../components/Geld.svelte";

    export let rows;
    export let setPage;
    export let rabatt;
    export let kasse;
    export let setRabatt;
    export let startsWith;

    let modal = startsWith[0] ? "": "gegeben";
    let total = 0;
    let warningmessage = "";
    let messages = [];
    let munzen = [];
    let fertig = false;

    if (rows.length == 0) {
        setPage("buy");
    } else {
        total = (
            rows
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
    }
    let pricecallback = (rr) => {
        modal = "none";
        if (rr < parseFloat(total.replace(",", "."))) {
            warningmessage = "Nicht genug Geld gegeben!";
            setTimeout(() => {
                warningmessage = "";
                setPage("buy");
            }, 2000);
            return;
        }
        if (rr == parseFloat(total.replace(",", "."))) {
            messages = [
                `Gegeben: ${rr.toString().replace(".", ",")} €`,
                "Rückgeld: 0 €",
            ];
            fertig = true;
            return;
        }        
        messages = [`Gegeben: ${rr.toString().replace(".", ",")} €`, `Rückgeld: ${(((rr * 100) - (parseFloat(total.replace(",", ".")) * 100)) / 100).toString().replace(".", ",")} €`];
        munzen = kasse.getRuckgeld(parseFloat(total.replace(",", ".")), rr);
        fertig = true;
    };
    let fertigcb = () => {
        setRabatt(0);
        setPage("home");
    };
    if(startsWith[0]) {
        pricecallback(startsWith[1]);
    }
</script>

<main>
    {#if warningmessage != ""}
        <span class="warning">{warningmessage}</span>
    {/if}
    {#if modal == "gegeben"}
        <Gegeben {pricecallback} />
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
            />
        {/each}
    </div>
    <div class="container" style="background: #E8E8E8;">
        <span class="total">Total: {total}€</span>
        {#each messages as msg}
            <span class="big">{msg}</span>
        {/each}
        {#if munzen.length != 0}
            <div class="munzen {munzen.length > 3 ? "munzenmore" : ""}">
                {#each munzen as munze}
                    <div class="munzanzahl">
                        <span class="anzahl">{munze.amount}</span>
                        <Geld value={munze.value} />
                    </div>
                {/each}
            </div>
        {/if}
        {#if fertig}
            <span class="fertig" on:click={() => fertigcb()}>Fertig</span>
        {/if}
    </div>
</main>

<style>
    .munzen {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        height: 570px;
        width: 50vw;
    }
    .munzenmore {
        display: grid;
        grid-template-columns: auto auto;
    }
    .munzanzahl {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 200px;
        padding-left: 50px;
        padding-right: 50px;
        gap: 5px;
    }
    .munzanzahl > .anzahl {
        font-size: 60px;
    }
    .total {
        margin-top: 40px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 64px;
        line-height: 75px;
    }
    .big {
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
    .warning {
        color: red;
        position: absolute;
        left: 50vw;
        top: 50vh;
        transform: translate(-50%, -50%);
        padding: 10px;
        background-color: white;
        border-radius: 10px;
        font-size: 30px;
    }
    .fertig {
        position: absolute;
        bottom: 20px;
        padding: 5px;
        background-color: white;
        border: 1px solid black;
        border-radius: 10px;
        font-size: 30px;
        cursor: pointer;
    }
</style>
