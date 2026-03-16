import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'pages', 'NewApplication.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('getFieldClass')) {
    content = content.replace('const handlePincodeChange = async', `const getFieldClass = (fieldName, extraClasses = '') => {
        const base = "w-full p-4 rounded-2xl outline-none transition " + extraClasses;
        if (rejectedFields.includes(fieldName)) {
            return base + " bg-red-50 border-2 border-red-500 focus:ring-2 focus:ring-red-200 text-red-900 placeholder-red-300";
        }
        return base + " bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400";
    };

    const handlePincodeChange = async`);
}

// Update text inputs
content = content.replace(/name="([^"]+)"\s*className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition([^"]*)"/g, (match, name, extra) => {
    return `name="${name}"\n                                            className={getFieldClass('${name}', '${extra.trim()}')}`;
});

// Update textareas
content = content.replace(/name="([^"]+)"\s*rows="3"\s*className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition([^"]*)"/g, (match, name, extra) => {
    return `name="${name}"\n                                            rows="3"\n                                            className={getFieldClass('${name}', '${extra.trim()}')}`;
});

fs.writeFileSync(filePath, content);
console.log('Successfully updated input classes');
