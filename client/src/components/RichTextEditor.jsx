import { useEffect, useRef } from 'react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command, val = null) => {
    document.execCommand(command, false, val);
    handleInput();
  };

  // SVGs for the toolbar
  const iconBold = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );

  const iconItalic = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );

  const iconUnderline = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  );

  const iconStrike = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12" />
      <path d="M16 6C15 4.3 13.5 3 11.5 3 8.5 3 6 5.5 6 8.5c0 3 2.5 5 5.5 5m3 0c3 0 5.5 2 5.5 5 0 3-2.5 5.5-5.5 5.5-2.5 0-4-1.5-4.5-3" />
    </svg>
  );

  const iconBullet = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );

  const iconNumber = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h1v4M4 10h2M4 16h2v2H4v-2zM4 18h2" />
    </svg>
  );

  const iconQuote = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  const iconClear = (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 20H7L3 16c-1.5-1.5-1.5-3.5 0-5l8.5-8.5c1.5-1.5 3.5-1.5 5 0l4 4c1.5 1.5 1.5 3.5 0 5L12 20" />
      <line x1="6" y1="11" x2="13" y2="18" />
    </svg>
  );

  return (
    <div className="border border-border rounded-lg bg-bg-input overflow-hidden flex flex-col focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/15 transition-all">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-bg-surface/50">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('bold'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-primary hover:text-primary transition-colors cursor-pointer"
          title="Bold"
        >
          {iconBold}
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('italic'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-primary hover:text-primary transition-colors cursor-pointer"
          title="Italic"
        >
          {iconItalic}
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('underline'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-primary hover:text-primary transition-colors cursor-pointer"
          title="Underline"
        >
          {iconUnderline}
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('strikeThrough'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-primary hover:text-primary transition-colors cursor-pointer"
          title="Strikethrough"
        >
          {iconStrike}
        </button>
        <span className="w-[1px] bg-border my-1.5 mx-1" />
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('insertUnorderedList'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-primary hover:text-primary transition-colors cursor-pointer"
          title="Bullet List"
        >
          {iconBullet}
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('insertOrderedList'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-primary hover:text-primary transition-colors cursor-pointer"
          title="Numbered List"
        >
          {iconNumber}
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('formatBlock', 'blockquote'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-primary hover:text-primary transition-colors cursor-pointer"
          title="Quote"
        >
          {iconQuote}
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); execCmd('removeFormat'); }}
          className="p-1.5 rounded hover:bg-bg-hover text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          title="Clear Formatting"
        >
          {iconClear}
        </button>
      </div>
 
      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        placeholder={placeholder}
        className="min-h-[140px] p-3.5 text-[13.5px] text-text-primary outline-none focus:outline-none overflow-y-auto font-sans content-editable-placeholder leading-relaxed rich-text-editor-content"
      />
    </div>
  );
};

export default RichTextEditor;
