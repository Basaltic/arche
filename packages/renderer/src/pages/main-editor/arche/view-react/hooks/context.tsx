import { createContext } from 'react';
import type { ArcheEditorState } from '../../state/state';

export const EditorStateContext = createContext<ArcheEditorState | null>(null);

export const ArcheStateContextProvider = EditorStateContext.Provider;
