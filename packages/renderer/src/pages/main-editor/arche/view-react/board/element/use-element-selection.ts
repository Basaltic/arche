import { useEffect } from 'react';
import { useForceUpdate } from '../../../../../../hooks/use-force-update';
import { useSelection } from '../../hooks/editor.hooks';

/**
 * Selection Binding
 */
export function useElementSelection(id: string) {
  const forceUpdate = useForceUpdate();
  const selection = useSelection();

  const isSelected = selection.checkIsSelected(id);

  useEffect(() => {
    selection.subscribe(id, forceUpdate);
    return () => {
      selection.unsubscribe(id);
    };
  }, []);

  const select = () => {
    if (!isSelected) {
      selection.selectAndDeselectOthers([id]);
    }
  };
  const deselect = () => {
    if (isSelected) {
      selection.deselect([id]);
    }
  };

  return {
    isSelected,
    select,
    deselect,
  };
}
