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
    LinkImage,
    BlockQuote,
    Alignment,
    CodeBlock
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

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
                plugins: [
                    Essentials, Bold, Italic, Paragraph, Mention, Undo,
                    Heading, List, CKLink, Image, ImageToolbar, ImageCaption,
                    ImageStyle, ImageResize, LinkImage, BlockQuote, Alignment,
                    CodeBlock
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
                        { language: 'plaintext', label: 'Plain text' },
                        { language: 'csharp', label: 'C#' },
                        { language: 'java', label: 'Java' },
                        { language: 'php', label: 'PHP' },
                        { language: 'javascript', label: 'JavaScript' },
                        { language: 'python', label: 'Python' },
                        { language: 'golang', label: 'Go' }
                    ]
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
                        'imageTextAlternative'
                    ]
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
