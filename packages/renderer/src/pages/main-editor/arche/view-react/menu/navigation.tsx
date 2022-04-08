import React, { memo } from 'react';
import { HiHome, HiChevronRight } from 'react-icons/hi';
import { useArcheEditorState } from '../hooks/editor.hooks';
import { useNodeBinding } from '../hooks/node.hooks';
import { useCommandExecutor, useCommands } from '../commands/commands.hooks';
import { useNavigationBinding } from '../hooks/navigation.hooks';

/**
 * KBoard Navigation
 */
export const PathNavigation = memo(() => {
  const { currentPath } = useNavigationBinding();

  const items = [];
  for (let i = 0; i < currentPath.length; i++) {
    const nid = currentPath[i];
    const path = currentPath.slice(0, i + 1);
    const hasNext = i !== currentPath.length - 1;
    items.push(<NavItem key={nid} path={path} hasNext={hasNext} />);
  }

  return <div className="absolute top-1 left-1 p-1 z-40 bg-white rounded-md shadow-md flex items-center">{items}</div>;
});

function NavItem(props: { path: string[]; hasNext: boolean }) {
  const { path, hasNext } = props;

  const nodeId = path[path.length - 1];

  const state = useArcheEditorState();
  const node = useNodeBinding(nodeId);
  const commands = useCommands();
  const commandExecutor = useCommandExecutor();

  const isRoot = state.knowledgeBase.isRoot(nodeId);

  const onClickToNavigate = () => {
    commandExecutor.execute(commands.navigate(path));
  };

  return (
    <>
      {isRoot ? (
        <HiHome className="cursor-pointer" fontSize={20} onClick={onClickToNavigate} />
      ) : (
        <div className="text-sm hover:underline cursor-pointer" onClick={onClickToNavigate}>
          {node?.meta?.name}
        </div>
      )}
      {hasNext && <HiChevronRight />}
    </>
  );
}
