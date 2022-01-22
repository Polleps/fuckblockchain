<script lang="ts">
	import * as Pancake from '@sveltejs/pancake';
	import type { TimePeriod } from '$lib/Models/Cache';

	export let data: TimePeriod[];
	export let percentage: number;

	const toNum = (d: string) => new Date(d).getTime();

	let lineColour = percentage < 0 ? 'green' : 'red';

	const formatCurrency = (n: number): string => {
		const options: Intl.NumberFormatOptions = {
			style: 'currency',
			currency: 'USD',
			currencyDisplay: 'symbol'
		};
		const formatter = new Intl.NumberFormat('default', options);

		return formatter.format(n);
	};

	const formatDate = (d: number): string => {
		const date = new Date(d);
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long'
		};
		const formatter = new Intl.DateTimeFormat('default', options);

		return formatter.format(date);
	};

	let mappedData = data?.map((d) => ({
		time: toNum(d.time),
		data: d.data
	}));

	console.log(mappedData);
	let miny = 0;
	let maxy = Math.max(...mappedData?.map((d) => d.data)) + 500;

	let minx = mappedData[0].time;
	let maxx = mappedData[data.length - 1].time;

	const relativeX = (n) => {
		return (100 * (n - minx)) / (maxx - minx);
	};
</script>

<!-- https://github.com/Rich-Harris/pancake/blob/master/examples/data/0/App.svelte -->
<div class="chart">
	<Pancake.Chart x1={minx} x2={maxx} y1={miny} y2={maxy}>
		<Pancake.Grid horizontal count={4} let:value let:last>
			<div class="grid-line horizontal"><span>${value}</span></div>
		</Pancake.Grid>

		<Pancake.Grid vertical count={mappedData.length} let:value>
			<div class="grid-line vertical" />
			<span class="year-label">{formatDate(value)}</span>
		</Pancake.Grid>
		<Pancake.Svg>
			<Pancake.SvgLine data={mappedData} x={(d) => d.time} y={(d) => d.data} let:d>
				<path class="trend" stroke={lineColour} {d} />
			</Pancake.SvgLine>
		</Pancake.Svg>
		<Pancake.Quadtree data={mappedData} x={(d) => d.time} y={(d) => d.data} let:closest>
			{#if closest}
				<Pancake.Point x={closest.time} y={closest.data} let:d>
					<div class="focus" style="background-color: {lineColour}" />
					<div class="tooltip" style="transform: translate(-{relativeX(closest.date)}%,0)">
						<strong>{formatCurrency(closest.data)}</strong>
						<span>{formatDate(closest.time)}</span>
					</div>
				</Pancake.Point>
			{/if}
		</Pancake.Quadtree>
	</Pancake.Chart>
</div>

<style>
	.chart {
		min-width: var(--size-fluid-10);
		height: 100%;
		background-color: var(--bg-color);
		border-radius: var(--radius-3);
		box-shadow: var(--shadow-4);
		color: var(--indigo-9);
		padding: 2rem;
	}
	path.trend {
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2px;
		fill: none;
	}
	.grid-line {
		position: relative;
		display: block;
	}
	.grid-line.horizontal {
		width: calc(100% + 2em);
		left: -2em;
		border-bottom: 1px dashed #ccc;
	}
	.grid-line.vertical {
		height: 100%;
		border-left: 1px dashed #ccc;
	}
	.grid-line span {
		position: absolute;
		left: 0;
		bottom: 2px;
		line-height: 1;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
	}
	.year-label {
		position: absolute;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 5em;
		left: -2em;
		bottom: -30px;
		font-family: sans-serif;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
	.focus {
		position: absolute;
		width: 10px;
		height: 10px;
		left: -5px;
		top: -5px;
		border-radius: 50%;
		box-sizing: border-box;
	}
	.tooltip {
		position: absolute;
		white-space: nowrap;
		bottom: 1em;
		background-color: rgba(255, 255, 255, 0.452);
		backdrop-filter: blur(5px);
		border-radius: var(--radius-3);
		box-shadow: var(--shadow-4);
		transition: transform 0.2s ease-in-out;
		color: black;
		padding: 1rem;
		line-height: 1;
		text-shadow: 0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white, 0 0 10px white,
			0 0 10px white, 0 0 10px white;
	}
	.tooltip strong {
		font-size: 1.4em;
		display: block;
	}
</style>
