🔹 1. How does Node.js work under the hood?
✅ Answer:
Node.js is built on:

Google’s V8 Engine (executes JavaScript code).

libuv (handles asynchronous I/O operations with an event loop and thread pool).

🔧 Workflow:

JS code runs on a single-threaded event loop.

Non-blocking I/O operations (file system, network, etc.) are delegated to libuv or OS threads.

Once complete, the callback is queued and picked by the event loop.

📌 Node.js is ideal for I/O-bound tasks, not CPU-bound operations.



  🔹 3. What is libuv and what is its role in Node.js?
✅ Answer:
libuv is a C library that:

Provides event loop implementation.

Handles asynchronous I/O, file system, networking, and thread pool management.

It enables Node.js to abstract OS-level async operations and gives its non-blocking nature.



  🔹 2. What is the Event Loop in Node.js? Can you explain its phases?
✅ Answer:
The Event Loop manages asynchronous operations in Node.js. It's a mechanism that allows Node.js to perform non-blocking I/O by offloading operations and handling callbacks.

Phases:
Timers – setTimeout, setInterval callbacks.

Pending Callbacks – OS-level callbacks (e.g., TCP errors).

Idle/Prepare – Internal use.

Poll – Retrieves new I/O events; waits if none.

Check – Executes setImmediate() callbacks.

Close Callbacks – E.g., socket.on('close', ...)







🔹 4. Explain the difference between Microtasks and Macrotasks in Node.js.
✅ Answer:
Microtasks:

Executed immediately after the current operation and before the next event loop phase.

Includes: process.nextTick(), Promises, queueMicrotask().

Macrotasks:

Scheduled in the event loop phases.

Includes: setTimeout, setImmediate, setInterval, I/O callbacks.

🔁 Microtasks are executed after each phase, which can starve the event loop if not handled correctly.
Between phases, process.nextTick() and Promises/Microtasks are processed.




  🔹 5. What is the difference between process.nextTick() and setImmediate()?
✅ Answer:
process.nextTick() queues callbacks before the next event loop tick (microtask).

setImmediate() queues callbacks after the current phase is complete (macrotask).

Use case:
Use nextTick() to defer execution within the same phase. Use setImmediate() to execute after I/O callbacks.

🔹 6. Is Node.js single-threaded or multi-threaded? Explain.
✅ Answer:
Node.js is:

Single-threaded for executing JavaScript.

Multi-threaded under the hood via:

libuv thread pool (4 threads by default) for handling file I/O, DNS, crypto.

worker_threads module for explicit multi-threading.

✅ For I/O-bound apps, Node.js performs well. For CPU-bound tasks, use worker threads or offload.

🔹 7. How does Node.js handle concurrency if it's single-threaded?
✅ Answer:
Through the event loop and async I/O, Node.js:

Delegates blocking operations (I/O, DNS, FS) to a thread pool.

Continues processing other events in the main thread without waiting.

Uses callbacks/promises to handle results once ready.

🧠 Concurrency is achieved by not blocking the event loop.

🔹 8. What is the difference between asynchronous and non-blocking in Node.js?
✅ Answer:
Asynchronous: Code execution doesn’t wait for an operation to finish (uses callbacks/promises).

Non-blocking: Doesn’t block the main thread — control is returned immediately.

📌 All non-blocking operations are asynchronous, but not all async operations are truly non-blocking (e.g., child_process.exec might block).

🔹 9. What are worker threads in Node.js and when should you use them?
✅ Answer:
worker_threads module allows running JavaScript code in parallel threads.

📦 Use when:

Performing CPU-intensive tasks (e.g., image processing, encryption).

You want true parallelism without blocking the main thread.

Example:

js
Copy
Edit
const { Worker } = require('worker_threads');
new Worker('./my-worker.js');
🔹 10. What is the role of the Cluster module in Node.js?
✅ Answer:
cluster allows you to spawn multiple Node.js processes to utilize multi-core systems.

Each process:

Shares the same server port.

Runs its own event loop.

📌 Good for horizontal scaling of HTTP servers.

🔹 Bonus: Interviewer asks: “What happens when you run a large for loop in Node.js?”
✅ Answer:
If the loop is CPU-intensive and runs on the main thread, it:

Blocks the event loop.

Prevents async callbacks, timers, and I/O from executing.

Makes the app unresponsive.

✅ Use setImmediate or worker_threads to break or offload heavy computation.
