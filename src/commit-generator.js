import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import moment from "moment";

// ✅ Step 1: All dates you want to use (DD/MM/YYYY)
const dates = [
  "7/5/2025",
  "8/5/2025",
  "9/5/2025",
  "10/5/2025",
  "11/5/2025",
  "12/5/2025",
  "13/5/2025",
  "14/5/2025",
  "15/5/2025",
  "16/5/2025",
  "17/5/2025",
  "18/5/2025",
  "19/5/2025",
  "20/5/2025",
  "21/5/2025",
  "22/5/2025",
  "23/5/2025",
  "24/5/2025",
  "25/5/2025",
  "26/5/2025",
  "27/5/2025",
  "28/5/2025",
  "29/5/2025",
  "30/5/2025",
  "31/5/2025",
  "1/6/2025",
  "2/6/2025",
  "3/6/2025",
  "4/6/2025",
  "5/6/2025",
  "6/6/2025",
  "7/6/2025",
  "8/6/2025",
  "9/6/2025",
  "10/6/2025",
  "11/6/2025",
  "12/6/2025",
  "13/6/2025",
  "14/6/2025",
  "15/6/2025",
  "16/6/2025",
  "17/6/2025",
  "18/6/2025",
  "19/6/2025",
  "20/6/2025",
  "21/6/2025",
  "22/6/2025",
  "23/6/2025",
  "24/6/2025",
  "25/6/2025",
  "26/6/2025",
  "27/6/2025",
  "28/6/2025",
  "29/6/2025",
  "30/6/2025",
  "1/7/2025",
  "2/7/2025",
  "3/7/2025",
  "4/7/2025",
];

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
