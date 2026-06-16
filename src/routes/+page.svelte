<script lang="ts">
    import Task from "$lib/components/Task.svelte";
    import { taskStore } from "$lib/class/TaskStore.svelte";
    import confetti from "@hiseb/confetti";

    let input = $state("");

 $effect(() => {
    if (taskStore.progress === 100) {
        confetti({
            position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
            count: 100,
            size: 1,
            velocity: 200,
            fade: false
        });
    }
});

    function addTask() {
        taskStore.addTask(input);
        input = "";
    }
</script>

<svelte:head>
    <title>Les To do - A faire ({taskStore.tasks.length})</title>
</svelte:head>

<h1>To do list</h1>

<div class="input-row">
    <input
        bind:value={input}
        placeholder="Nouvelle tâche..."
        onkeydown={(e) => e.key === "Enter" && addTask()}
    />
    <button onclick={addTask}>Ajouter</button>
</div>

{#if taskStore.tasks.length > 0}
    <div class="progress-wrap">
        <span class="progress-label">{taskStore.progressLabel}</span>
        <div class="progress-bar" style="--width:{taskStore.progress}%">
            <div class="progress-fill"></div>
        </div>
        <span class="progress-pct">{taskStore.progress}%</span>
    </div>
{/if}

<div class="board">
    {#each taskStore.tasks as task, i (task.id)}
        <Task bind:task={taskStore.tasks[i]} />
    {:else}
        <p class="empty">Ajoute des tâches !</p>
    {/each}
</div>

<style>
    :global(body) {
        background-color: #1a1a2e;
        background-image: radial-gradient(
            circle at 20% 30%,
            #16213e 0%,
            #1a1a2e 60%
        );
        min-height: 100vh;
        margin: 0;
        font-family: "Segoe UI", sans-serif;
    }

    h1 {
        color: #e0d7ff;
        text-align: center;
        font-size: 2rem;
        letter-spacing: 0.05em;
        margin: 2rem 0 1.5rem;
    }

    .input-row {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 1.5rem;
    }

    .input-row input {
        padding: 10px 16px;
        border-radius: 8px;
        border: none;
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
        font-size: 15px;
        width: 260px;
        outline: none;
    }

    .input-row input::placeholder {
        color: rgba(255, 255, 255, 0.35);
    }

    .input-row button {
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        background: #7c5cbf;
        color: #fff;
        font-size: 15px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .input-row button:hover {
        background: #9b7de0;
    }

    .progress-wrap {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 auto 2rem;
        width: 320px;
    }

    .progress-bar {
        flex: 1;
        height: 8px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 99px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #7c5cbf, #e91e63);
        border-radius: 99px;
        transition: width 0.4s ease;
        width: var(--width);
    }

    .progress-label,
    .progress-pct {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.5);
        white-space: nowrap;
    }

    .board {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 48px;
        padding: 2rem;
    }

    .empty {
        color: rgba(255, 255, 255, 0.4);
        text-align: center;
        font-size: 15px;
        width: 100%;
    }
</style>