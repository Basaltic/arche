import { useForceUpdate } from '/@/hooks/use-force-update';
import { useEffect } from 'react';
import { useKnowlegeBase } from '../../hooks/editor.hooks';

/**
 * Frangment Binding
 *
 * @param id
 */
export function useFragmentBinding(id: string) {
  const forceUpdate = useForceUpdate();
  const knowledgeBase = useKnowlegeBase();

  const fragment = knowledgeBase.getFragment(id);

  useEffect(() => {
    fragment.observe(forceUpdate);
    return () => {
      fragment.unobserve(forceUpdate);
    };
  }, [fragment]);

  return { nodeIds: fragment.childNodeIds, fragmentId: fragment.guid };
}
