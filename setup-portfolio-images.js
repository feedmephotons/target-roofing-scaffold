const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, 'src', 'data', 'projects.json');
const portfolioDir = path.join(__dirname, 'public', 'images', 'portfolio');
const genericImagePath = path.join(portfolioDir, 'thumbnail-generic.jpg');

console.log('Starting portfolio image check/setup...');
console.log('Projects path:', projectsPath);
console.log('Portfolio directory:', portfolioDir);
console.log('Generic image path:', genericImagePath);

if (!fs.existsSync(projectsPath)) {
  console.error('Error: projects.json not found!');
  process.exit(1);
}

if (!fs.existsSync(genericImagePath)) {
  console.error('Error: thumbnail-generic.jpg not found in portfolio directory!');
  process.exit(1);
}

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
let createdCount = 0;
let existingCount = 0;

projects.forEach((project) => {
  if (!project.name) return;
  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filename = `${slug}.jpg`;
  const imagePath = path.join(portfolioDir, filename);

  if (fs.existsSync(imagePath)) {
    existingCount++;
  } else {
    fs.copyFileSync(genericImagePath, imagePath);
    console.log(`Copied placeholder to missing image: ${filename}`);
    createdCount++;
  }
});

console.log(`Completed. Existing: ${existingCount}, Created/Copied: ${createdCount}`);
