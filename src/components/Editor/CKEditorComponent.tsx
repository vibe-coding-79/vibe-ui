import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    Heading,
    List,
    Link as CKLink,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    ImageUpload,
    ImageInsert,
    AutoImage,
    LinkImage,
    BlockQuote,
    Alignment,
    CodeBlock,
    Autoformat,
    FileRepository
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { S3UploadAdapterPlugin } from './CKEditorUploadAdapter';

interface CKEditorComponentProps {
    initialData?: string;
    onChange?: (data: string) => void;
    placeholder?: string;
}

const CKEditorComponent: React.FC<CKEditorComponentProps> = ({
    initialData = '',
    onChange,
    placeholder = 'Start writing your story here...'
}) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                extraPlugins: [S3UploadAdapterPlugin],
                plugins: [
                    Essentials, Bold, Italic, Paragraph, Mention, Undo,
                    Heading, List, CKLink,
                    Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize,
                    ImageUpload, ImageInsert, AutoImage, LinkImage,
                    FileRepository,
                    BlockQuote, Alignment, CodeBlock, Autoformat
                ],
                toolbar: [
                    'undo', 'redo', '|',
                    'heading', '|',
                    'bold', 'italic', '|',
                    'link', 'insertImage', 'blockQuote', 'codeBlock', '|',
                    'bulletedList', 'numberedList', '|',
                    'alignment',
                ],
                codeBlock: {
                    languages: [
                        { language: 'plaintext', label: 'Plain text', class: '' },
                        { language: 'javascript', label: 'JavaScript' },
                        { language: 'typescript', label: 'TypeScript' },
                        { language: 'python', label: 'Python' },
                        { language: 'go', label: 'Go' },
                        { language: 'java', label: 'Java' },
                        { language: 'csharp', label: 'C#' },
                        { language: 'php', label: 'PHP' },
                        { language: 'html', label: 'HTML' },
                        { language: 'css', label: 'CSS' },
                        { language: 'sql', label: 'SQL' },
                        { language: 'bash', label: 'Bash' },
                        { language: 'json', label: 'JSON' },
                        { language: 'ruby', label: 'Ruby' },
                        { language: 'rust', label: 'Rust' },
                        { language: 'yaml', label: 'YAML' },
                        { language: 'dockerfile', label: 'Dockerfile' }
                    ],
                    indentSequence: '  '
                },
                licenseKey: 'GPL',
                placeholder: placeholder,
                image: {
                    toolbar: [
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'resizeImage'
                    ],
                    insert: {
                        type: 'auto',
                        integrations: ['upload', 'url']
                    }
                },
                mention: {
                    feeds: [
                        {
                            marker: '@',
                            feed: ['@admin', '@editor', '@john', '@jane'],
                            minimumCharacters: 1
                        }
                    ]
                }
            }}
            data={initialData}
            onReady={(editor) => {
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(_event, editor) => {
                const data = editor.getData();
                if (onChange) {
                    onChange(data);
                }
            }}
        />
    );
};

export default CKEditorComponent;
