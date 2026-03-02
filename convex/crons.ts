import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Auto-delete estates after 90 days — runs daily at 3am UTC
crons.daily("delete-expired-estates",
  { hourUTC: 3, minuteUTC: 0 },
  internal.estates.deleteExpired
);

// Reset demo estate every 24 hours
crons.daily("reset-demo-estate",
  { hourUTC: 4, minuteUTC: 0 },
  internal.scripts.resetDemo
);

export default crons;
