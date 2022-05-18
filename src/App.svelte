<script>
	import Bar from "./components/Bar.svelte";
	import Home from "./pages/Home.svelte";
	import Lager from "./pages/Lager.svelte";
	import Buy from "./pages/Buy.svelte";

	let page = "home";
	let setPage = (p) => {
		page = p;
	}
</script>

<main>
	<Bar {setPage} />
	{#if page == "home"}
		<Home {setPage} />
	{:else if page == "lager"}
		<Lager />
	{:else if page == "buy"}
		<Buy />
	{/if}
</main>

<style>
	main {
		height: 100vh;
	}
</style>
