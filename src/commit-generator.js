import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import moment from "moment";

// ✅ Step 1: All dates you want to use (DD/MM/YYYY)
const dates = ["23/8/2024", "25/8/2024"];

// ✅ Auto-generated messages
const messages = [
  "Update logic",
  "Fix bug",
  "Refactor code",
  "Improve performance",
  "Tweak config",
  "Minor update",
  "Enhance docs",
];

// ✅ Loop through dates
for (const rawDate of dates) {
  const m = moment(rawDate, ["D/M/YYYY", "M/D/YYYY"]);
  if (!m.isValid()) {
    console.error(`❌ Skipping invalid date: ${rawDate}`);
    continue;
  }

  const gitDate = m.format("ddd MMM D 01:00:00 YYYY +0000"); // e.g. Sat Jul 5 1:00:00 2025 +0000
  const message = messages[Math.floor(Math.random() * messages.length)];

  // Generate filename and save JSON
  const fileName = `commit-${Date.now()}.json`;
  const filePath = path.join(process.cwd(), fileName);

  const data = {
    date: gitDate,
    message,
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`📦 Created file: ${fileName} with message: "${message}"`);

  try {
    execSync(`git add ${fileName}`);
    execSync(`git commit -m "${message}"`);
    execSync(`git commit --amend --no-edit --date="${gitDate}"`);
    execSync(`git push --force`);
    console.log(`✅ Pushed commit for date: ${gitDate}`);
  } catch (error) {
    console.error(`❌ Git failed for ${rawDate}:`, error.message);
  }

  // Optional: wait 1 second to avoid same timestamp file
  await new Promise((res) => setTimeout(res, 1000));
}
