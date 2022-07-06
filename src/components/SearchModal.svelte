<script>
    export let elements;
    export let searchcb;

    let value = "";
    let handleType = () => {
        console.log(elements)
        selements = elements.filter(m => m.toLowerCase().includes(value.toLowerCase()))
    }
    let handleModalClick = (ev) => {
        if(ev.target.localName == "textarea") return;
        searchcb("none");
    }
    let selements = elements;
</script>

<div class="modal" on:click={handleModalClick}>
    <div class="inner">
        <textarea name="SearchBar" on:keyup={() => handleType()} bind:value={value}></textarea>
        <div class="elements">
            {#each selements as element}
                <span class="element" on:click={() => searchcb(element)}>{element}</span>
            {/each}
        </div>
    </div>
</div>

<style>
    .modal {
        position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
    }
    .inner {
        box-sizing: border-box;
        border-radius: 16px;
		width: 568px;
		background: white;
		height: 700px;
        padding: 20px;
		box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		align-items: center;
        gap: 20px;
    }
    textarea {
        width: 100%;
        border: none;
        background-color: gray;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 5px;
        resize: none;
        outline: none;
        color: white;
        font-size: 30px;
        height: 48px;
    }
    .elements {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow-y: auto;
    }
    .element {
        font-size: 20px;
        height: 30px;
        border-bottom: 1px solid black;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .element:hover {
        background-color: whitesmoke;
    }
</style>