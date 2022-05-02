import React from 'react';
import { useCommands, useCommandExecutor } from '../../../commands/commands.hooks';
import { useObserveElementMeta } from '../../../hooks/node.hooks';
import { EditableTitle } from '/@/components/editable-title';

export const ElementCommonTitle = (props: { id: string }) => {
  const { id } = props;

  const commands = useCommands();
  const commandExecutor = useCommandExecutor();
  const { name } = useObserveElementMeta(id);

  /**
   * 提交修改画板标题
   *
   * @param value
   * @returns
   */
  const submitToChangeTitle = (value: string) => commandExecutor.execute(commands.changeMeta(id, { name: value }));

  /**
   * 点击Enter
   */
  const onEnter = (title: string) => {
    submitToChangeTitle(title);
  };

  /**
   * 失去焦点
   *
   * @param title
   */
  const onBlur = (title: string) => {
    submitToChangeTitle(title);
  };
  return <EditableTitle title={name} onBlur={onBlur} onEnter={onEnter} />;
};
