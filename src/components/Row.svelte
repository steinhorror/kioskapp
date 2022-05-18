<script>
    export let amount;
    export let product;
    export let price;
</script>

<main>
    <span class="text" style="text-align: start">{amount}</span>
    <span class="text" style="text-align: center">{product}</span>
    <span class="text" style="text-align: end">{price}</span>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 50vw;
        padding: 16px;
    }
</style>