import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

interface TextEditorProps {
  content: string;
  setContent: (value: string) => void;
}

const TextEditor = ({ content, setContent }: TextEditorProps): JSX.Element => {
  const [editorData, setEditorData] = useState(content);

  const updateEditorData = useCallback(
    debounce((data: string): void => {
      setEditorData(data);

      if (setContent) {
        setContent(data);
      }
    }, 500),
    [setContent]
  );

  const onEditorChange = (event: any, editor: any): void => {
    const data = editor.getData();
    updateEditorData(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      onChange={onEditorChange}
    />
  );
};

export default TextEditor;
