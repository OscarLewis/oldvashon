<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Map from "./lib/Map.svelte";
</script>

<main>
  <Header />
  <Map />
</main>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
