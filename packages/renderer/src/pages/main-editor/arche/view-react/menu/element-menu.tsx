import React from 'react';
import { elementRegistry } from '../board/element/element-registry';
import type { TElement } from '../board/element/element.types';
import { useCommandExecutor, useCommands } from '../hooks/commands.hooks';
import { useStateQueries } from '../hooks/query.hooks';

/**
 * Element Menu
 */
export const ElementMenu = () => {
  const elements = elementRegistry.getAll();

  return (
    <div className="absolute bottom-2 left-2 z-40 flex">
      {elements && elements.map((ele) => <ElementMenuButton key={ele.type} {...ele} />)}
    </div>
  );
};

function ElementMenuButton(props: TElement) {
  const { name, icon, type } = props;

  const commands = useCommands();
  const commandExecutor = useCommandExecutor();

  const { getPresentNodeId } = useStateQueries();

  const clickToAddElement = () => {
    const parentNodeId = getPresentNodeId();
    if (parentNodeId) {
      const ele = elementRegistry.get(type);
      if (ele) {
        commandExecutor.execute(commands.appendElement(parentNodeId, ele));
      }
    }
  };

  return (
    <div className="flex flex-col items-center" onClick={clickToAddElement}>
      <div className="p-1 bg-base-100 rounded-md shadow-xl">{icon}</div>
      <div className="mt-1 text-xs">{name}</div>
    </div>
  );
}
