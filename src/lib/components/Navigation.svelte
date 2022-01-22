<script lang="ts">
	import { Tracker } from '$lib/Models/Tracker';
</script>

<nav>
	<ul>
		<li>
			<a href={`#${Tracker.BTC_VALUE}`}> BTC value </a>
		</li>
		<li>
			<a href={`#${Tracker.ETH_VALUE}`}> ETH Value </a>
		</li>
		<li>
			<a href={`#${Tracker.BLOCKCHAIN_TREND}`}> Blockchain Popularity </a>
		</li>
		<li>
			<a href={`#${Tracker.NFT_TREND}`}> NFT Popularity </a>
		</li>
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		color: var(--gray-9);
		font-size: var(--font-size-3);
		flex-wrap: wrap;
		gap: var(--size-7);
	}
</style>
