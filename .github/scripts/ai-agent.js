#!/usr/bin/env node
/**
 * AI Agent - Autonomous code modification agent
 * Uses Claude API to analyze and improve the codebase
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const CONFIG = {
  maxFilesToModify: 3,
  maxTokens: 4096,
  model: "claude-sonnet-4-20250514",
  excludeDirs: ["node_modules", ".git", "dist", "coverage", ".github/scripts"],
  includeExtensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
};

// Task types and their prompts
const TASK_PROMPTS = {
  improve: "Improve code quality, readability, and maintainability",
  refactor: "Refactor code to follow better patterns and reduce complexity",
  "add-tests": "Add or improve unit tests for better coverage",
  "fix-bugs": "Identify and fix potential bugs or issues",
  "add-comments": "Add helpful JSDoc comments and inline documentation",
  optimize: "Optimize code for better performance",
};

// Get random task if needed
function getTaskType() {
  const taskType = process.env.TASK_TYPE || "random";
  if (taskType === "random") {
    const tasks = Object.keys(TASK_PROMPTS);
    return tasks[Math.floor(Math.random() * tasks.length)];
  }
  return taskType;
}

// Get all eligible source files
function getSourceFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(process.cwd(), fullPath);

    // Skip excluded directories
    if (CONFIG.excludeDirs.some((excluded) => relativePath.includes(excluded))) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getSourceFiles(fullPath, files);
    } else if (CONFIG.includeExtensions.some((ext) => item.endsWith(ext))) {
      files.push(relativePath);
    }
  }

  return files;
}

// Select random files to modify
function selectFilesToModify(files) {
  const shuffled = files.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, CONFIG.maxFilesToModify);
}

// Call Claude API
async function callClaudeAPI(prompt, fileContent, fileName) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set");
    process.exit(1);
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CONFIG.model,
      max_tokens: CONFIG.maxTokens,
      messages: [
        {
          role: "user",
          content: `You are an expert code reviewer and developer. Your task: ${prompt}

File: ${fileName}

Current code:
\`\`\`
${fileContent}
\`\`\`

Instructions:
1. Analyze the code carefully
2. Make meaningful improvements based on the task
3. Return ONLY the complete modified code, no explanations
4. If no changes needed, return the original code unchanged
5. Preserve all imports and exports
6. Keep the same file structure

Return the complete modified code:`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Extract code from response (remove markdown if present)
function extractCode(response) {
  // Remove markdown code blocks if present
  const codeBlockMatch = response.match(/```(?:\w+)?\n([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  return response.trim();
}

// Main execution
async function main() {
  console.log("🤖 AI Agent starting...\n");

  const taskType = getTaskType();
  const taskPrompt = TASK_PROMPTS[taskType];

  console.log(`📋 Task: ${taskType}`);
  console.log(`📝 Prompt: ${taskPrompt}\n`);

  // Get source files
  const srcDir = path.join(process.cwd(), "src");
  const files = getSourceFiles(srcDir);
  console.log(`📁 Found ${files.length} source files\n`);

  // Select files to modify
  const selectedFiles = selectFilesToModify(files);
  console.log(`🎯 Selected ${selectedFiles.length} files to analyze:\n`);
  selectedFiles.forEach((f) => console.log(`   - ${f}`));
  console.log("");

  const changes = [];

  for (const filePath of selectedFiles) {
    try {
      console.log(`\n🔍 Processing: ${filePath}`);

      const fullPath = path.join(process.cwd(), filePath);
      const originalContent = fs.readFileSync(fullPath, "utf8");

      // Skip very large files
      if (originalContent.length > 50000) {
        console.log(`   ⏭️ Skipping (file too large)`);
        continue;
      }

      // Call AI
      console.log(`   🧠 Calling Claude API...`);
      const response = await callClaudeAPI(taskPrompt, originalContent, filePath);
      const modifiedContent = extractCode(response);

      // Check if content actually changed
      if (modifiedContent !== originalContent && modifiedContent.length > 100) {
        fs.writeFileSync(fullPath, modifiedContent);
        console.log(`   ✅ Modified successfully`);
        changes.push({
          file: filePath,
          task: taskType,
          linesChanged: Math.abs(modifiedContent.split("\n").length - originalContent.split("\n").length),
        });
      } else {
        console.log(`   ⏭️ No changes needed`);
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }

    // Small delay between API calls
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Generate summary
  const summary = changes.length > 0 ? `${taskType}: Modified ${changes.length} files` : `${taskType}: No changes needed`;

  const changesText =
    changes.length > 0
      ? changes.map((c) => `- \`${c.file}\`: ${c.task} (${c.linesChanged} lines changed)`).join("\n")
      : "No files were modified.";

  // Set GitHub Actions outputs
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `summary=${summary}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `changes<<EOF\n${changesText}\nEOF\n`);
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary:", summary);
  console.log("📝 Changes:");
  console.log(changesText);
  console.log("=".repeat(50));

  // Run linting to fix any formatting issues
  if (changes.length > 0) {
    console.log("\n🔧 Running lint fix...");
    try {
      execSync("yarn lint:fix", { stdio: "inherit" });
    } catch {
      console.log("   ⚠️ Lint fix had some issues (non-fatal)");
    }
  }

  console.log("\n🤖 AI Agent completed!");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

