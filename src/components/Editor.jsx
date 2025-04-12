import React, { useMemo, useCallback, useState } from 'react';
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { BiHeading, BiBold, BiItalic, BiListUl, BiListOl } from 'react-icons/bi';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

// Define initial value outside the component to ensure it's stable
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold : false;
  },

  isItalicMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic : false;
  },

  isBlockActive(editor, format) {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
      })
    );

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, 'italic');
    } else {
      Editor.addMark(editor, 'italic', true);
    }
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });

    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };

    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'heading-one':
      return <h1 className="text-2xl font-bold mb-4" {...attributes}>{children}</h1>;
    case 'bulleted-list':
      return <ul className="list-disc ml-6 mb-4" {...attributes}>{children}</ul>;
    case 'numbered-list':
      return <ol className="list-decimal ml-6 mb-4" {...attributes}>{children}</ol>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    default:
      return <p className="mb-4" {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  return <span {...attributes}>{children}</span>;
};

const Toolbar = ({ editor }) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-neutral-800">
      <button
        className={`p-2 rounded hover:bg-neutral-800 ${
          CustomEditor.isBlockActive(editor, 'heading-one')
            ? 'bg-neutral-800 text-neutral-200'
            : 'text-neutral-400'
        }`}
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, 'heading-one');
        }}
      >
        <BiHeading size={20} />
      </button>
      <button
        className={`p-2 rounded hover:bg-neutral-800 ${
          CustomEditor.isBoldMarkActive(editor)
            ? 'bg-neutral-800 text-neutral-200'
            : 'text-neutral-400'
        }`}
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        <BiBold size={20} />
      </button>
      <button
        className={`p-2 rounded hover:bg-neutral-800 ${
          CustomEditor.isItalicMarkActive(editor)
            ? 'bg-neutral-800 text-neutral-200'
            : 'text-neutral-400'
        }`}
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleItalicMark(editor);
        }}
      >
        <BiItalic size={20} />
      </button>
      <button
        className={`p-2 rounded hover:bg-neutral-800 ${
          CustomEditor.isBlockActive(editor, 'bulleted-list')
            ? 'bg-neutral-800 text-neutral-200'
            : 'text-neutral-400'
        }`}
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, 'bulleted-list');
        }}
      >
        <BiListUl size={20} />
      </button>
      <button
        className={`p-2 rounded hover:bg-neutral-800 ${
          CustomEditor.isBlockActive(editor, 'numbered-list')
            ? 'bg-neutral-800 text-neutral-200'
            : 'text-neutral-400'
        }`}
        onMouseDown={event => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, 'numbered-list');
        }}
      >
        <BiListOl size={20} />
      </button>
    </div>
  );
};

const NotionEditor = () => {
  // Use the initialValue constant defined outside the component
  const [value, setValue] = useState(initialValue);

  // Create a stable editor instance with useMemo
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 text-neutral-200">
      <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
        <Toolbar editor={editor} />
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Type '/' for commands..."
              spellCheck={false}
              className="min-h-[calc(100vh-12rem)] outline-none"
              onKeyDown={event => {
                if (!event.ctrlKey) return;

                switch (event.key) {
                  case 'b': {
                    event.preventDefault();
                    CustomEditor.toggleBoldMark(editor);
                    break;
                  }
                  case 'i': {
                    event.preventDefault();
                    CustomEditor.toggleItalicMark(editor);
                    break;
                  }
                }
              }}
            />
          </div>
        </div>
      </Slate>
    </div>
  );
};

export default NotionEditor; 