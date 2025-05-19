import os
import glob
import markdown

script_dir = os.path.dirname(os.path.abspath(__file__))

md_folder_path = os.path.join(script_dir, '..', 'md')

md_files = glob.glob(os.path.join(md_folder_path, '*.md'))

for md_file_path in md_files:
    with open(md_file_path, 'r', encoding='utf-8') as file:
        markdown_text = file.read()

    html_content = markdown.markdown(markdown_text)

    html_file_name = os.path.basename(md_file_path).replace('.md', '.html')
    html_file_path = os.path.join(script_dir, html_file_name)

    with open(html_file_path, 'w', encoding='utf-8') as file:
        file.write(html_content)

    print(f"HTML file generated at {html_file_path}")