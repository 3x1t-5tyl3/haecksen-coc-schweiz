// this entire file is a clsuterfuck and i dont care. i used a bit of mistral.ai to help me with regex and the manual toc shit cause fuck that lmao.
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const mdFolderPath = path.join(__dirname, 'md');

function processMarkdown(markdownText) {
    // honestly fuck this regex, but it works lol
    const headingRegex = /^(#+)\s+(.*?)\s*$/gm;
    let match;
    let toc = '## Table of Contents\n\n';
    let lastIndex = 0;
    let modifiedMarkdown = '';

    // heading didn't work properly. idk. it's good enough ¯\_(ツ)_/¯
    while ((match = headingRegex.exec(markdownText)) !== null) {
        modifiedMarkdown += markdownText.substring(lastIndex, match.index);

        const level = match[1].length;
        const title = match[2].trim();
        const anchor = title.toLowerCase().replace(/\s+/g, '-');

        // AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
        modifiedMarkdown += `${match[1]} <a name="${anchor}"></a>${title}\n`;
        toc += `${'  '.repeat(level - 1)}- [${title}](#${anchor})\n`;
        lastIndex = headingRegex.lastIndex;
    }
    modifiedMarkdown += markdownText.substring(lastIndex);
    return `${toc}\n\n${modifiedMarkdown}`;
}

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
                const processedMarkdown = processMarkdown(markdownText);
                const htmlContent = marked.parse(processedMarkdown);
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