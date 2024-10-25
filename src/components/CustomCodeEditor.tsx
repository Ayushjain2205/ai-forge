import React, { useCallback } from "react";
import styled from "styled-components";

const EditorContainer = styled.div`
  position: relative;
  text-align: left;
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
  font-size: 12px;
  line-height: 1.5;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const EditorTextarea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  resize: none;
  color: inherit;
  overflow: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-fill-color: transparent;
  padding: 15px;
  border: none;
  background: none;
  outline: none;
  white-space: pre;
  word-wrap: normal;
  overflow-wrap: normal;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
`;

const EditorPre = styled.pre`
  margin: 0;
  padding: 15px;
  border: 0;
  background: none;
  white-space: pre;
  word-wrap: normal;
  overflow-wrap: normal;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
`;

interface CustomCodeEditorProps {
  value: string;
  language: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({
  value,
  language,
  placeholder,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  return (
    <EditorContainer>
      <EditorTextarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        spellCheck={false}
      />
      <EditorPre aria-hidden="true">{value}</EditorPre>
    </EditorContainer>
  );
};

export default CustomCodeEditor;
