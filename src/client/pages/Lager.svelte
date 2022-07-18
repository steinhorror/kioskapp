<script>
    import Row from "../components/Row.svelte";
    import EditButton from "../components/EditButton.svelte";
    
    export let prices;
    let allprices = prices.getAll();
    let editmode = false;
    let toggleedit = () => {
        editmode = !editmode;
    }
    let changecb = (e) => {
        prices.obj[e.index] = {
            amount: e.amount,
            name: e.product,
            price: parseFloat(e.price.replace("€", "").trim())
        }
        fetch("http://" + location.host + "/api/write", {
            method: "POST",
            body: JSON.stringify(prices.obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
</script>

<main style="overflow-y: scroll;height: 100vh;">
    <EditButton clickcb={() => toggleedit()}/>
    <div class="container">
        <div
            class="row"
            style="background-color: #DADADA;border-bottom: 2px solid black;"
        >
            <span class="text" style="text-align: start">Menge</span>
            <span class="text" style="text-align: center">Produkt</span>
            <span class="text" style="text-align: end">Preis</span>
        </div>
    </div>
    {#each allprices as row}
        <Row index={allprices.indexOf(row)} amount={row.amount} product={row.name} price={row.price} editable={editmode} changedcb={(e) => changecb(e)}/>
    {/each}
</main>

<style>
    .container {
        width: 100%;
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
        width: 100vw;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
