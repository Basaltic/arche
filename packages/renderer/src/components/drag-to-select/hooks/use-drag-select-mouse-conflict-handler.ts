import { useCallback, useEffect } from 'react';

/**
 * 处理全局拖拽和鼠标事件冲突问题
 * @param ref
 */
export default function useDragSelectMouseConflictHandler(ref: React.RefObject<HTMLDivElement>) {
  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const container = ref.current;
    container?.addEventListener('mousedown', onMouseDown);
    return () => {
      container?.removeEventListener('mousedown', onMouseDown);
    };
  }, [onMouseDown, ref]);
}
