<script>
    export let amount;
    export let product;
    export let price;
    export let halfwidth = false;
    export let rabatt = false;
    export let editable = false;
    export let changedcb = () => {};
    export let index = 0;
    export let editmenge = false;
    export let mengecb = () => {};
    let amtbind, prodbind, pricebind;
</script>

<main autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class={halfwidth ? "halfwidth" : ""}>
    <span style="text-align: start" on:keyup={() => changedcb({ index, amount: amtbind.innerHTML, product: prodbind.innerHTML, price: pricebind.innerHTML })} contenteditable={editable} bind:this={amtbind}>{#if editmenge}<i on:click={() => mengecb("-")} class="bi bi-dash-square" />{/if}{amount}{#if editmenge}<i on:click={() => mengecb("+")} class="bi bi-plus-square" />{/if}</span>
    <span style="text-align: center" on:keyup={() => changedcb({ index, amount: amtbind.innerHTML, product: prodbind.innerHTML, price: pricebind.innerHTML })} contenteditable={editable} bind:this={prodbind}>{product}</span>
    <span style="text-align: end" on:keyup={() => changedcb({ index, amount: amtbind.innerHTML, product: prodbind.innerHTML, price: pricebind.innerHTML })} contenteditable={editable} bind:this={pricebind}>{price.toString().includes(",") && price.split(",")[1].length == 1 ? price + "0" : price} {rabatt ? "%" : "€"}</span>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100vw;
        padding: 16px;
        box-sizing: border-box;
    }
    .halfwidth {
        width: 50vw;
    }
    span {
        font-family: "Roboto", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 48px;
        line-height: 56px;
        width: 33%;
    }
    .bi {
        cursor: pointer;
    }
</style>