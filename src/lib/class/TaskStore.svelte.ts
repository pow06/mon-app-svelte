import { browser } from "$app/env";
import { Task } from "./Task.svelte";

class TaskStore {
    tasks: Task[] = $state([]);
    progress = $derived(this.tasks.length === 0
        ? 0
        : Math.round((this.tasks.filter((t) => t.done).length / this.tasks.length) * 100));

    progressLabel = $derived(`${this.tasks.filter(t => t.done).length}/${this.tasks.length}`)

    constructor() {
        if (browser) {
            const stored = localStorage.getItem('tasks');
            if (stored) {
                this.tasks = JSON.parse(stored).map(Task.fromJSON);
            }
        }

        $effect.root(() => {
            $effect(() => {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            });
        });
    }

    addTask(text: string) {
        if (text.trim() !== '') {
            this.tasks.push(new Task(text))
        }
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(t => t.id !== id)
    }
}

export const taskStore = new TaskStore();