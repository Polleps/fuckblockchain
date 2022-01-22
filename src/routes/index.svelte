<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { Tracker } from '$lib/Models/Tracker';

	export const load: Load = async ({ url, fetch }) => {
		const path = `/data/${url.hash.substring(1) || Tracker.BTC_VALUE}`;
		const res = await fetch(path);

		if (res.ok) {
			return {
				props: {
					data: (await res.json()).data
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script lang="ts">
	import Graph from '$lib/components/Graph.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Percentage from '$lib/components/Percentage.svelte';
	import type { TimePeriod } from '$lib/Models/Cache';

	export let data: TimePeriod[];

	function getPercentage() {
		const yesterday = data[6];
		const today = data[7];

		const difference = yesterday.data - today.data;

		return Math.round((difference / yesterday.data) * 100 * -1);
	}

	let percentage = getPercentage();
</script>

<main>
	<div class="percent-wrapper">
		<Percentage value={percentage} />
	</div>
	<div class="graph-wrapper">
		<Graph {data} {percentage} />
	</div>
	<div class="nav-wrapper">
		<Navigation />
	</div>
</main>

<style>
	main {
		height: 100vh;
		max-height: 100vh;
		max-width: 100vw;
		/* background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgb(218, 255, 253) 100%); */
		background: conic-gradient(from -90deg at 50% 105%, white, rgb(126, 233, 227) 100%);
		display: grid;
		grid-template-areas: 'percentage' 'graph' 'nav';
		grid-template-rows: 2fr 3fr 1fr;
		justify-items: center;
		align-items: center;
	}

	.graph-wrapper {
		height: 100%;
	}
</style>
