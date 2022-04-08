import { createContext } from 'react';
import type { KnowledgeBaseEditorState } from '../../state/state';

export const EditorStateContext = createContext<KnowledgeBaseEditorState | null>(null);

export const ArcheStateContextProvider = EditorStateContext.Provider;
