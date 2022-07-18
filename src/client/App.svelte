<script>
	import Bar from "./components/Bar.svelte";
	import Home from "./pages/Home.svelte";
	import Lager from "./pages/Lager.svelte";
	import Buy from "./pages/Buy.svelte";
	import Payment from "./pages/Payment.svelte";
	import Scanners from "./pages/Scanners.svelte";

	import { Prices } from "./Prices";
	import { Kasse } from "./Kasse";
	import { Scanner } from "./Scanner";
	import pricesjson from "./prices.json";

	let prices = new Prices();
	fetch("http://" + location.host + "/api/read")
		.then(async (res) => {
			return res.json();
		})
		.then((res) => {
			prices.setAll(res);
		});

	let kasse = new Kasse();

	let rows = [];
	let rabatt = 0;
	let setRabatt = (rr) => (rabatt = rr);
	let setRows = (rr) => (rows = rr);

	let page = "home";
	let setPage = (p) => {
		if(page == "home") rows = [];
		if(page == "buy") startsWith = [false, 0]
		page = p;
	};
	let scanner = new Scanner();
	let startsWith = [false, 0];
	window.onkeyup = scanner.onkeyup;
	scanner.cb = (e) => {
		if (page == "pay" || e == undefined) return;
		if (e.startsWith("pay") && rows.length > 0) {
			startsWith = [true, parseInt(e.split("pay ")[1]) / 100];
			page = "pay";
		}
		if (e.startsWith("add")) {
			if (rows.find((m) => m.product == e.split("add ")[1])) {
				rows.find((m) => m.product == e.split("add ")[1]).amount++;
				return (rows = rows);
			}
			rows = [
				{
					amount: 1,
					product: e.split("add ")[1],
					price: prices.getFromName(e.split("add ")[1]).price,
				},
				...rows,
			];
		}
	};
</script>

<main>
	<Bar {setPage} />
	{#if page == "home"}
		<Home {setPage} />
	{:else if page == "lager"}
		<Lager {prices} />
	{:else if page == "buy"}
		<Buy {prices} {setPage} {setRows} {setRabatt} {rows}/>
	{:else if page == "pay"}
		<Payment {rows} {setPage} {rabatt} {setRabatt} {kasse} {startsWith} />
	{:else if page == "scanners"}
		<Scanners />
	{/if}
</main>

<style>
	main {
		height: 100vh;
	}
</style>
