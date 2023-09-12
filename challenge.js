//import node js module to manipulate file system
const fs = require('fs');

// Read user and company data from JSON files
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
const companies = JSON.parse(fs.readFileSync('companies.json', 'utf8'));

// Filter active users belonging to a company
const activeUsers = users.filter((user) => user.active_status);

// Sort companies by ID and users by last name
companies.sort((a, b) => a.id - b.id);
activeUsers.sort((a, b) => a.last_name.localeCompare(b.last_name));

// Process and generate the output text
let output = '';
activeUsers.forEach((user) => {
  const company = companies.find((c) => c.id === user.company_id);

  if (company) {
    const topUp = company.top_up;
    const emailStatus = user.email_status;

    // Update user's token and create a log entry
    user.tokens += topUp;
    const log = `${user.first_name} ${user.last_name} (${user.email}): Top-up ${topUp} tokens.`;

    // Append log entry and email status to the output text
    output += log + (emailStatus ? ' Sent an email.\n' : '\n');
  }
});

// Write the output text to output.txt
fs.writeFileSync('output.txt', output);

console.log('"output.txt" generated successfully.');
