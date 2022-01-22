<script lang="ts">
	export let value: number;

	let prefix = value < 0 ? '-' : '+';
	let emoji = value < 0 ? '🎉' : '😔';
</script>

<span class:good={value < 0} class:bad={value > 0}>
	{prefix}{Math.abs(value)}% {emoji}
</span>

<style>
	span {
		font-size: calc(2 * var(--font-size-fluid-3));
		text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.1);
	}

	.good {
		color: rgb(112, 230, 112);
	}

	.bad {
		color: rgb(238, 89, 89);
	}
</style>
