const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const map = {
    'bg-gray-950': 'dark:bg-gray-950 bg-gray-50',
    'bg-gray-900': 'dark:bg-gray-900 bg-white',
    'bg-gray-800': 'dark:bg-gray-800 bg-gray-50',
    'text-white': 'dark:text-white text-gray-900',
    'bg-white/5': 'dark:bg-white/5 bg-white',
    'bg-white/10': 'dark:bg-white/10 bg-gray-50',
    'border-white/10': 'dark:border-white/10 border-gray-200',
    'border-white/5': 'dark:border-white/5 border-gray-100',
    'border-white/20': 'dark:border-white/20 border-gray-300',
    'text-gray-400': 'dark:text-gray-400 text-gray-600',
    'text-gray-300': 'dark:text-gray-300 text-gray-700',
    'text-gray-500': 'dark:text-gray-500 text-gray-500', // keeping 500 equivalent in both for simplicity
};

// Create a regex that looks for these exact classes without dark: in front
// Wait, Tailwind classes could be inside strings like "bg-gray-950", so we need boundaries
const keys = Object.keys(map).map(k => k.replace(/\//g, '\\/'));
const pattern = new RegExp(`(?<!dark:)(?<!-)\\b(${keys.join('|')})\\b(?!\\/)`, 'g');

walkDir(srcDir, (filePath) => {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        if (filePath.includes('Sidebar.jsx') || filePath.includes('DashboardLayout.jsx') || filePath.includes('ThemeContext.jsx')) {
            return;
        }

        content = content.replace(pattern, (match) => {
            return map[match] || match;
        });

        if (content !== originalContent) {
            console.log('Updated', filePath);
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});
