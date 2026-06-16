<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="container">
    {@render children?.()}
</div>

<style>
    .container {
        width: 1024px;
        margin: 0 auto;
    }

</style>