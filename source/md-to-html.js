const fs = require('fs');
const path = require('path');
const marked = require('marked');

const mdFolderPath = path.join(__dirname, '..', 'md');

fs.readdir(mdFolderPath, (err, files) => {
    if (err) {
        console.error('Error reading the directory:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const mdFilePath = path.join(mdFolderPath, file);

            fs.readFile(mdFilePath, 'utf8', (err, markdownText) => {
                if (err) {
                    console.error(`Error reading file ${file}:`, err);
                    return;
                }

                const htmlContent = marked.parse(markdownText);

                const htmlFileName = file.replace('.md', '.html');
                const htmlFilePath = path.join(__dirname, htmlFileName);

                fs.writeFile(htmlFilePath, htmlContent, (err) => {
                    if (err) {
                        console.error(`Error writing file ${htmlFileName}:`, err);
                        return;
                    }
                    console.log(`HTML file generated at ${htmlFilePath}`);
                });
            });
        }
    });
});