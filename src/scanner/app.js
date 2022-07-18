const ws = new WebSocket((location.hostname == "localhost" ? "ws://" : "wss://") + location.hostname);
ws.onmessage = (msg) => console.log(msg)
ws.onclose = () => {
    fetch(location.hostname)
    .then(res => {
        if(res.ok) return location.reload()
        document.body.innerHTML = `URL hat sich geändert! Bitte scanne den QR-Code erneut!`
    })
    .catch(res => document.body.innerHTML = `URL hat sich geändert! Bitte scanne den QR-Code erneut!`)
}

let player = document.getElementById("player");
let canvas = document.getElementById("canv");
let ctx = canvas.getContext("2d");
let constraints = { video: {} };
constraints.video = navigator.userAgent.toLowerCase().includes("mobile") ? { facingMode: { exact: "environment" } } : {};

Quagga.onDetected((d) => {
    ws.send(JSON.stringify({ code: d.codeResult.code }))
    // player.srcObject.getVideoTracks().forEach(track => track.stop());
})

document.body.insertAdjacentHTML("beforeend", `
<div id="modal" style="position: absolute;left: 50vw;top: 50vh;height: 15vh;width: 40vw;transform: translate(-50%, -50%);border-radius: 20px;border: 1px solid;background: whitesmoke;display: flex;justify-content: center;align-items: center;flex-direction: column;gap: 10px;font-family: sans-serif;">
<span>Bitte Namen eintragen:</span>
<span id="name" style="border-bottom: 1px solid;width: 47%;" contenteditable="">a</span>
<div id="send" style="cursor: pointer; padding: 7px;border-radius: 10px;color: white;background: black;margin-top: 20px;">Eingeben</div>
</div>`);

let count = 0;
document.getElementById("send").onclick = () => {
    if(count == 0) {
        let name = document.getElementById("name").innerText;
        ws.send(JSON.stringify({ name }));
        document.getElementById("name").remove()
        document.querySelector("#modal > span:first-child").innerText = "Bitte erlaube im nächsten Bildschirm den Kamerazugriff."
        count = 1;
        return;
    }
    document.getElementById("modal").remove()
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        player.srcObject = stream;
        Quagga.init({
            inputStream: {
                target: player
            },
            decoder: {
                multiple: false,
                readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader", "2of5_reader", "code_93_reader"]
            }
        }, (err) => {
            if(err) return console.log(err)
            Quagga.start()
        })
    })
}