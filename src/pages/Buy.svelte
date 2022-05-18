<script>
    import PriceModal from "../components/PriceModal.svelte";
    let showmodal = false;
    function toggleModal() {
        showmodal = !showmodal;
    }
    let pricecallback = (a) => {
        console.log(a)
        toggleModal();
    }
</script>

<main>
    {#if showmodal}
        <PriceModal {toggleModal} {pricecallback}/>
    {/if}
    <div class="container">
        <div class="row" style="background-color: #DADADA;border-bottom: 2px solid black;">
            <span class="text" style="text-align: start">Menge</span>
            <span class="text" style="text-align: center">Produkt</span>
            <span class="text" style="text-align: end">Preis</span>
        </div>
    </div>
    <div class="container" style="background: #E8E8E8;">
        <span style="margin-top: 40px;font-family: Roboto;font-style: normal;font-weight: 500;font-size: 64px;line-height: 75px;">
            Total: €
            </span>
        <div style="bottom: 16px;position: absolute;display: flex;justify-content: center;align-items: center;flex-wrap: wrap;gap: 16px;">
            <div style="display: flex;gap: 16px;">
                <div class="btn suchen" style="background-color: #3CD1F2">
                    <span>Suchen</span>
                </div>
                <div class="btn rabatt" style="background-color: #FF8A00">
                    <span>Rabatt</span>
                </div>
            </div>
            <div style="display: flex;gap: 16px;">
                <div class="btn bezahlen" style="background-color: #5DE08A">
                    <span>Bezahlen</span>
                </div>
                <div class="btn preis" style="background-color: #FFE9BD" on:click={() => showmodal = !showmodal}>
                    <span>Manueller Preis</span>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
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
