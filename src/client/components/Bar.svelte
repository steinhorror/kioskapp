<script>
    export let setPage;

    let date = new Date();
    let time =
        ("0" + date.getHours()).substr(-2) +
        ":" +
        ("0" + date.getMinutes()).substr(-2);
    let updateTime = () => {
        date = new Date();
        time =
            ("0" + date.getHours()).substr(-2) +
            ":" +
            ("0" + date.getMinutes()).substr(-2);
    };

    // UPDATE LOOP
    setInterval(() => {
        updateTime();
    }, 1000);
</script>

<main>
    <div class="bar">
        <div class="baricons">
            <i on:click={setPage("home")} id="home" class="bi bi-house-fill" />
            <i on:click={setPage("scanners")} class="bi bi-upc-scan" />
        </div>
        <span class="time">{time}</span>
    </div>
</main>

<style>
    .bar {
        height: 50px;
        background-color: black;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 50px;
    }

    .bi {
        font-size: 40px;
    }

    .time {
        font-size: 48px;
    }

    .baricons {
        cursor: pointer;
        display: flex;
    }
</style>
