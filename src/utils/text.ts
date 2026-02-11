export const stripHtml = (html: string): string => {
    if (!html) return '';
    try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    } catch (e) {
        console.error("Failed to strip HTML:", e);
        return html;
    }
};
