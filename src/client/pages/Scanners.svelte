<script>
    import { onMount } from "svelte";
    import qrcode from "qrcode-generator";

    let scanners = [];
    let code = "";
    let url = "";
    onMount(async () => {
        let qr = qrcode(0, "H");
        let res = await fetch("http://localhost:8080/api/ngrok");
        res = await res.json();
        url = res;
        qr.addData(res);
        qr.make();
        code = qr.createSvgTag();
    });
    let ws = new WebSocket("ws://localhost:8081/listener")
    ws.onopen = () => {
        ws.onmessage = (msg) => {
            scanners = JSON.parse(msg.data);
        }
    }
</script>

<main>
    <div class="container">
        <div
            class="row"
            style="background-color: #DADADA;border-bottom: 2px solid black;"
        >
            <span class="text" style="text-align: start">Name</span>
            <span class="text" style="text-align: end">Entfernen</span>
        </div>
        {#each scanners as scanner}
            <div class="row">
                <span class="text" style="text-align: start">{scanner}</span>
                <span class="text" style="text-align: end">Entfernen</span>
            </div>
        {/each}
    </div>
    <div class="container center" style="background: #E8E8E8;">
        <a href={url} class="title">Add New Scanner</a>
        {@html code}
    </div>
</main>

<style>
    .title {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 48px;
        text-decoration: none;
        color: black;
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
    :global(.container.center > svg) {
        width: 50%;
        height: auto;
    }
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
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
</style>
