// backend/src/services/eventQueue.service.js

class EventQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(event) {
    this.queue.push(event);
    this.process();
  }

  async process() {
    if (this.processing) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const event = this.queue.shift();

      try {
        await this.handleEvent(event);
      } catch (err) {
        console.error("Event processing error:", err);
      }
    }

    this.processing = false;
  }

  async handleEvent(event) {
    // Placeholder: integrate scoring + anomaly + DB updates
    // This will be wired later with controller
    console.log("Processing event:", event.type);
  }
}

export const eventQueue = new EventQueue();