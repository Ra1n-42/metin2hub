import React from 'react';
import DOMPurify from 'dompurify';

interface SecureHtmlRendererProps {
    html: string;
    className?: string;
}

// Component to safely render markdown-like text
const MarkdownText: React.FC<{ text: string }> = ({ text }) => {
    const renderText = (text: string) => {
        return text
            // Bold text **text**
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic text *text*
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Bullet points •
            .replace(/^• (.+)$/gm, '<li>$1</li>')
            // Convert newlines to breaks
            .replace(/\n/g, '<br>');
    };

    return (
        <div
            className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderText(text) }}
        />
    );
};

const SecureHtmlRenderer: React.FC<SecureHtmlRendererProps> = ({ html, className = "" }) => {
    // Configure DOMPurify to allow safe HTML elements and attributes
    const cleanHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'div', 'span', 'blockquote', 'code', 'pre'
        ],
        ALLOWED_ATTR: [
            'class', 'style'
        ],
    });

    return (
        <div
            className={`creator-html-content ${className}`}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    );
};

// Combined component for description rendering
interface DescriptionRendererProps {
    asset: {
        description?: string;
        descriptionHtml?: string;
    };
    className?: string;
}

const DescriptionRenderer: React.FC<DescriptionRendererProps> = ({ asset, className = "" }) => {
    return (
        <div className={`bg-accent/30 rounded-lg p-4 border border-accent ${className}`}>
            {asset.descriptionHtml ? (
                <SecureHtmlRenderer
                    html={asset.descriptionHtml}
                    className="prose dark:prose-invert max-w-none"
                />
            ) : asset.description ? (
                <MarkdownText text={asset.description} />
            ) : (
                <p className="text-muted-foreground italic">No additional description provided.</p>
            )}
        </div>
    );
};

export { SecureHtmlRenderer, MarkdownText, DescriptionRenderer };
export default DescriptionRenderer;