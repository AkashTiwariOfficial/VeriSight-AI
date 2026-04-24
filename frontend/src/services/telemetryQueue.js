class TelemetryQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  add(event) {
    this.queue.push(event);
  }

  start(flushInterval = 3000) {
    setInterval(() => {
      this.flush();
    }, flushInterval);
  }

  flush() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    this.send(batch);
  }

  send(batch) {
    console.log("📡 Sending telemetry batch:", batch);

    // You will connect this with socket or API
    import("./socket").then(({ sendTelemetry }) => {
      sendTelemetry({ batch });
    });
  }
}

export const telemetryQueue = new TelemetryQueue();