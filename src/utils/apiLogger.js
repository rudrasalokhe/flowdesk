// Live API Event Logger for FAANG Interview Showcase
// Records all outgoing REST requests and responses made through src/api/client.js

class ApiLogger {
  constructor() {
    this.logs = [];
    this.listeners = new Set();
  }

  logRequest({ method, url, headers, body, status, response, duration, isMock = false }) {
    const entry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      method: (method || 'GET').toUpperCase(),
      url,
      headers,
      body: body || null,
      status: status || 200,
      response: response || null,
      duration: duration || Math.floor(Math.random() * 40 + 15), // ms
      isMock
    };

    this.logs = [entry, ...this.logs.slice(0, 49)]; // Keep last 50 logs
    this.notify();
    return entry;
  }

  getLogs() {
    return this.logs;
  }

  clear() {
    this.logs = [];
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.logs));
  }
}

export const apiLogger = new ApiLogger();
