<script lang="ts">
    import type { Task } from "$lib/class/Task.svelte";
    import { taskStore } from "$lib/class/TaskStore.svelte";

    interface Props {
        task: Task;
    }

    let { task = $bindable() }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="task"
    class:task-done={task.done}
    style="
        --rotation: {task.rotation}deg;
        --bg: {task.color};
        --border: {task.borderColor};
        --fold: {task.foldColor};
    "
    onclick={() => task.toggleDone()}
>
    <div class="pin"></div>
    <p class:line={task.done}>{task.text}</p>
    <button
        onclick={(e) => {
            e.stopPropagation();
            taskStore.deleteTask(task.id);
        }}>✕</button
    >
</div>

<style>
    .task {
        background-color: var(--bg);
        color: #1a1a1a;
        width: 160px;
        height: 160px;
        padding: 36px 16px 16px;
        border-radius: 3px;
        border-top: 26px solid var(--border);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        transform: rotate(var(--rotation));
        box-shadow:
            3px 3px 8px rgba(0, 0, 0, 0.35),
            0 1px 2px rgba(0, 0, 0, 0.2);
        transition:
            transform 0.2s,
            box-shadow 0.2s;
        cursor: pointer;
        transition: all 0.5s ease;
    }

    .task-done {
        filter: grayscale(1) blur(10px) ;
        opacity: .5;
    }

    .task:hover {
        transform: rotate(0deg) scale(1.06);
        box-shadow: 6px 10px 20px rgba(0, 0, 0, 0.5);
        z-index: 10;
    }

    .task::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 28px 28px;
        border-color: transparent transparent var(--fold) transparent;
        filter: drop-shadow(-2px -2px 3px rgba(0, 0, 0, 0.25));
    }

    .pin {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 10px;
        background: radial-gradient(
            circle at 35% 35%,
            #fff 0%,
            #aaa 60%,
            #555 100%
        );
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    p {
        font-size: 15px;
        font-weight: 500;
        text-align: center;
        line-height: 1.4;
        margin: 0;
        flex: 1;
        display: flex;
        align-items: center;
        word-break: break-word;
    }

    .line {
        text-decoration: line-through;
        opacity: 0.45;
    }

    button {
        font-size: 13px;
        padding: 3px 8px;
        border-radius: 4px;
        border: none;
        background: rgba(0, 0, 0, 0.12);
        color: #333;
        cursor: pointer;
        transition: background 0.2s;
        align-self: flex-end;
    }

    button:hover {
        background: rgba(0, 0, 0, 0.25);
    }
</style>
