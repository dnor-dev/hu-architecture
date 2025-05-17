import { Queue } from "bullmq";

export default new Queue("reminderQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});
