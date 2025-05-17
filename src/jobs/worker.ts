import { Worker } from "bullmq";

const worker = new Worker(
  "reminderQueue",
  async (job) => {
    const { sessionId } = job.data;
    console.log(`Reminder: Session ${sessionId} starts in 1 hour.`);
    // Reminder (email or push notif)
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

export default worker;
