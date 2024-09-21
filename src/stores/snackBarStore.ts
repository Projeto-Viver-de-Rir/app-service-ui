import type { SnackBar, SnackBarState } from "@/interfaces/components";
import { defineStore } from "pinia";

export const useSnackBar = defineStore('snackBarStore', {
  state: (): SnackBarState => ({
    queue: [],
    busy: false,
    defaultTimeout: 3000,
    interval: null,
  }),
  getters: {
    shouldDisplaySnackBar(): boolean {
      return !!this.queue.length;
    },
    currentSnackBar(): SnackBar | undefined {
      return this.queue[0];
    },
    timeout(): number {
      return this.currentSnackBar?.timeout || this.defaultTimeout;
    }
  },
  actions: {
    addToQueue(snackBar: SnackBar): void {
      if (!snackBar) return;
      this.queue.push(snackBar);
      if (!this.busy) {
        this.showSnackBar();
      }
    },
    showSnackBar(): void {
      this.busy = true;
      this.interval = setInterval(() => {
        if (this.queue.length === 1) {
          clearInterval(this.interval);
          this.busy = false;
        }
        this.queue.splice(0, 1);
      }, this.timeout);
    },
  },
});
