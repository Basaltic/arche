import { useCallback, useEffect, useState } from 'react';
import type { TSyncableNodeMeta, TSyncableNodePostiion } from '../../model/syncable-node';
import { useForceUpdate } from '../../../../../hooks/use-force-update';
import { useArcheEditorState, useKnowlegeBase } from './editor.hooks';

/**
 * Node Binding
 */
export function useNodeBinding(id: string) {
  const forceUpdate = useForceUpdate();
  const editorState = useArcheEditorState();

  const node = editorState.knowledgeBase.getNode(id);

  const [isLoaded, setIsLoaded] = useState<boolean>(node?.isLoaded || false);

  const load = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    node?.meta?.observe(forceUpdate);
    node?.state?.observe(forceUpdate);
    node?.on('load', load);

    return () => {
      node?.meta?.unobserve(forceUpdate);
      node?.state?.unobserve(forceUpdate);
      node?.off('load', load);
    };
  }, [node]);

  return {
    id: node?.guid,
    meta: node?.meta?.toJSON(),
    state: node?.state?.toJSON(),
    isLoaded,
  };
}

export function useObserveElementLoad(id: string) {
  const knowledgeBase = useKnowlegeBase();
  const node = knowledgeBase.getNode(id);
  const [isLoaded, setIsLoaded] = useState<boolean>(node?.isLoaded || false);

  const load = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    node?.on('load', load);

    return () => {
      node?.off('load', load);
    };
  }, [node]);

  return isLoaded;
}

export function useObserveElementMeta(id: string) {
  const forceUpdate = useForceUpdate();
  const knowledgeBase = useKnowlegeBase();
  const node = knowledgeBase.getNode(id);

  useEffect(() => {
    node?.meta?.observe(forceUpdate);

    return () => {
      node?.meta?.unobserve(forceUpdate);
    };
  }, [node]);

  return node?.meta.toJSON() as TSyncableNodeMeta;
}

export function useObserveElementState<State = any>(id: string) {
  const forceUpdate = useForceUpdate();
  const knowledgeBase = useKnowlegeBase();
  const node = knowledgeBase.getNode(id);

  useEffect(() => {
    node?.state?.observe(forceUpdate);

    return () => {
      node?.state?.unobserve(forceUpdate);
    };
  }, [node]);

  return node?.state.toJSON() || ({} as State);
}

export function useObserveElementPosition(id: string) {
  const forceUpdate = useForceUpdate();
  const knowledgeBase = useKnowlegeBase();
  const node = knowledgeBase.getNode(id);

  useEffect(() => {
    node?.position?.observe(forceUpdate);

    return () => {
      node?.position?.unobserve(forceUpdate);
    };
  }, [node]);

  return node?.position.toJSON() as TSyncableNodePostiion;
}

/**
 * Get Node Content
 *
 * @param id
 * @returns
 */
export function useNode(id: string) {
  const state = useArcheEditorState();
  const node = state.knowledgeBase.getNode(id);

  return {
    id: node?.guid,
    meta: node?.meta.toJSON(),
    state: node?.state?.toJSON(),
  };
}

/**
 * Get Node Meta Info
 *
 * @param id
 */
export function useElementMeta(id: string) {
  const state = useArcheEditorState();
  const node = state.knowledgeBase.getNode(id);
  return node?.meta.toJSON() as TSyncableNodeMeta;
}

/**
 * Get Node State
 */
export function useElementState<State = any>(id: string) {
  const state = useArcheEditorState();
  const node = state.knowledgeBase.getNode(id);
  return node?.state.toJSON() as State;
}

/**
 * Get Position
 */
export function useElementPosition(id: string) {
  const state = useArcheEditorState();
  const node = state.knowledgeBase.getNode(id);
  return node?.position.toJSON() as TSyncableNodePostiion;
}
