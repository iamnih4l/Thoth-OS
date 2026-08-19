import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..', '..');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'data.json');

function walkDir(dir, filterExt) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file, filterExt));
    } else {
      if (file.endsWith(filterExt)) {
        results.push(file);
      }
    }
  });
  return results;
}

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);
  return {
    path: filePath.replace(ROOT_DIR, '').replace(/\\/g, '/'),
    data: parsed.data,
    content: parsed.content
  };
}

function extractSection(content, sectionName) {
  const regex = new RegExp(`##\\s+${sectionName}\\s*\\n([^#]*)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function main() {
  console.log('Generating Thoth-OS capability data...');

  const skillsDir = path.join(ROOT_DIR, 'Skills');
  const coreDir = path.join(ROOT_DIR, 'Core');
  const agentsDir = path.join(ROOT_DIR, 'Agents');
  const mcpDir = path.join(ROOT_DIR, 'MCP');

  const data = {
    skills: [],
    coreModules: [],
    agents: [],
    mcp: [],
    metadata: {
      generatedAt: new Date().toISOString()
    }
  };

  // Parse Skills
  const skillFiles = walkDir(skillsDir, 'SKILL.md');
  skillFiles.forEach(file => {
    const parsed = parseMarkdownFile(file);
    const parts = parsed.path.split('/');
    const category = parts[2] || 'Uncategorized';
    
    // Fallbacks if frontmatter is missing
    const name = parsed.data.name || parts[3] || 'Unknown Skill';
    const description = parsed.data.description || extractSection(parsed.content, 'Purpose') || 'No description available';
    
    data.skills.push({
      id: name.toLowerCase().replace(/\\s+/g, '-'),
      name,
      description,
      category,
      path: parsed.path,
      purpose: extractSection(parsed.content, 'Purpose'),
      workflow: extractSection(parsed.content, 'Workflow'),
      inputFormat: extractSection(parsed.content, 'Input Format'),
      outputFormat: extractSection(parsed.content, 'Output Format'),
      status: 'Active'
    });
  });

  // Parse Core Modules
  const coreFiles = walkDir(coreDir, '.md');
  coreFiles.forEach(file => {
    const parsed = parseMarkdownFile(file);
    const filename = path.basename(file, '.md');
    // Extract metadata block: > **Module**: Core\n> **Version**: 1.0.0...
    const moduleMatch = parsed.content.match(/> \\*\\*Module\\*\\*: (.*)/);
    const statusMatch = parsed.content.match(/> \\*\\*Status\\*\\*: (.*)/);
    
    data.coreModules.push({
      id: filename,
      name: filename.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      moduleType: moduleMatch ? moduleMatch[1].trim() : 'Core',
      status: statusMatch ? statusMatch[1].trim() : 'Active',
      purpose: extractSection(parsed.content, 'Purpose'),
      responsibilities: extractSection(parsed.content, 'Responsibilities'),
      path: parsed.path
    });
  });

  // Parse Agents
  const agentFiles = walkDir(agentsDir, '.md');
  agentFiles.forEach(file => {
    const parsed = parseMarkdownFile(file);
    const filename = path.basename(file, '.md');
    const parts = parsed.path.split('/');
    const category = parts[2] || 'Uncategorized';

    const role = extractSection(parsed.content, 'Role');
    const expertise = extractSection(parsed.content, 'Expertise');

    data.agents.push({
      id: filename,
      name: filename.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      category,
      role,
      expertise,
      path: parsed.path
    });
  });

  // Parse MCP
  const mcpFiles = walkDir(mcpDir, '.md');
  mcpFiles.forEach(file => {
    const parsed = parseMarkdownFile(file);
    const filename = path.basename(file, '.md');
    const parts = parsed.path.split('/');
    const category = parts[2] || 'Uncategorized';

    data.mcp.push({
      id: filename,
      name: filename,
      category,
      path: parsed.path
    });
  });

  data.metadata.skillCount = data.skills.length;
  data.metadata.coreModuleCount = data.coreModules.length;
  data.metadata.agentCount = data.agents.length;
  data.metadata.mcpCount = data.mcp.length;

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`Generated data.json with ${data.skills.length} skills, ${data.coreModules.length} core modules, and ${data.agents.length} agents.`);
}

main();
