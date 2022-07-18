<script>
    import mapping from "../geldmapping.json";
    
    export let value;
    let isschein = false;
    if(value >= 5) isschein = true;
</script>

<img class={isschein ? "schein" : "coin"} src={mapping[value]} alt="Geld">

<style>
    .coin {
        width: 128px;
        height: 128px;
    }
    .schein {
        height: auto;
        max-width: 220px;
    }
</style>