<script>
	export let pricecallback;

	let preis = "0";
	function addNumber(number) {
		preis = preis == "0" ? number : preis + number;
	}
	function removeAll() {
		preis = "0"
	}
</script>

<main>
	<div class="inner">
		<span style="font-size: 48px;margin-top: 16px;">Preis</span>
		<span style="font-size: 94.59px;">{preis}</span>
		<div style="display: flex;justify-content: center;align-items: center;gap: 16px;flex-wrap: wrap">
			<div class="btn-small" on:click={() => addNumber("1")}><span>1</span></div>
			<div class="btn-small" on:click={() => addNumber("2")}><span>2</span></div>
			<div class="btn-small" on:click={() => addNumber("3")}><span>3</span></div>
			<div class="btn-small" on:click={() => addNumber("4")}><span>4</span></div>
			<div class="btn-small" on:click={() => addNumber("5")}><span>5</span></div>
			<div class="btn-small" on:click={() => addNumber("6")}><span>6</span></div>
			<div class="btn-small" on:click={() => addNumber("7")}><span>7</span></div>
			<div class="btn-small" on:click={() => addNumber("8")}><span>8</span></div>
			<div class="btn-small" on:click={() => addNumber("9")}><span>9</span></div>
			<div class="btn-small" on:click={() => addNumber(",")}><span>,</span></div>
			<div class="btn-small" on:click={() => addNumber("0")}><span>0</span></div>
			<div class="btn-small" style="background: #FF8C8C;" on:click={() => removeAll()}><span>C</span></div>
		</div>
		<svg
			on:click={() => pricecallback(parseFloat(preis.replaceAll(",", ".")))}
			style="position: absolute;border-radius: 50%;top: 46px;right: 33vw;"
			viewBox="0 0 128 128"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			width="128"
			height="128"
		>
			<circle class="check" cx="64" cy="64" r="64" fill="#8CFF9F" />
			<path
				class="check"
				d="M96.4602 33.6561C96.9752 33.1318 97.5898 32.7152 98.2681 32.4308C98.9463 32.1465 99.6746 32 100.41 32C101.146 32 101.874 32.1465 102.553 32.4308C103.231 32.7152 103.846 33.1318 104.36 33.6561C106.519 35.8322 106.549 39.3487 104.436 41.5625L59.8187 94.1968C59.3122 94.7519 58.6974 95.1981 58.0122 95.508C57.3269 95.8178 56.5854 95.9849 55.8332 95.999C55.081 96.0131 54.3338 95.8739 53.6373 95.5899C52.9408 95.306 52.3098 94.8832 51.7827 94.3474L24.6336 66.8932C23.5865 65.8277 23 64.3948 23 62.9024C23 61.41 23.5865 59.9771 24.6336 58.9115C25.1485 58.3872 25.7631 57.9706 26.4414 57.6863C27.1197 57.4019 27.848 57.2554 28.5837 57.2554C29.3194 57.2554 30.0477 57.4019 30.726 57.6863C31.4043 57.9706 32.0189 58.3872 32.5338 58.9115L55.563 82.2016L96.3093 33.8217C96.3562 33.7636 96.4066 33.7082 96.4602 33.6561Z"
				fill="black"
			/>
		</svg>
		<svg
			on:click={() => pricecallback("none")}
			style="left: 30vw;position: absolute;border-radius: 50%;top: 46px;"
			width="128"
			height="128"
			viewBox="0 0 128 128"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="64" cy="64" r="64" fill="#FF8C8C" />
			<path
				d="M28.5476 28.615C29.5388 27.6233 30.8829 27.0661 32.2845 27.0661C33.686 27.0661 35.0302 27.6233 36.0214 28.615L63.9982 56.6159L91.975 28.615C92.4626 28.1098 93.0458 27.7067 93.6907 27.4295C94.3355 27.1522 95.0291 27.0063 95.7309 27.0002C96.4328 26.9941 97.1288 27.1279 97.7784 27.3939C98.4279 27.6599 99.0181 28.0527 99.5144 28.5495C100.011 29.0462 100.403 29.6368 100.669 30.287C100.935 30.9371 101.068 31.6337 101.062 32.3361C101.056 33.0386 100.91 33.7328 100.633 34.3782C100.356 35.0236 99.9537 35.6073 99.4489 36.0953L71.4721 64.0963L99.4489 92.0972C100.412 93.0949 100.944 94.4312 100.932 95.8183C100.92 97.2054 100.364 98.5322 99.3845 99.513C98.4045 100.494 97.0788 101.05 95.6929 101.062C94.307 101.074 92.9719 100.541 91.975 99.5775L63.9982 71.5766L36.0214 99.5775C35.0245 100.541 33.6894 101.074 32.3035 101.062C30.9176 101.05 29.5919 100.494 28.6119 99.513C27.6319 98.5322 27.0761 97.2054 27.064 95.8183C27.052 94.4312 27.5847 93.0949 28.5476 92.0972L56.5243 64.0963L28.5476 36.0953C27.5567 35.1033 27 33.758 27 32.3552C27 30.9524 27.5567 29.6071 28.5476 28.615Z"
				fill="black"
			/>
		</svg>
	</div>
</main>

<style>
	main {
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
		border-radius: 16px;
		width: 568px;
		background: white;
		height: 930px;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.25);
	}
	.btn-small {
		background-color: #c4c4c4;
		width: 168px;
		height: 168px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		font-size: 95px;
		font-weight: 500;
		flex-wrap: wrap;
		cursor: pointer;
	}
</style>
