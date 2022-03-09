import React from 'react';
import { useContextMenu, Menu, ItemParams, Item, Separator } from '../../../../../../../../components/context-menu';
import KeyboardItem from '../../../../../../../../components/keyboard-item';
import { IUvaNode } from '../../../../../../interface/uva-node.interface';
import { DEFAULT_COLOR_LIST } from '../constants';
import ContextMenuColorPicker from '../context-menu-color-picker';
import { useCommands } from '../../../../../../models/use-commands';
import { Grid } from '@mui/material';

enum MENU_ITEM_ACTION {
  DELETE = 'delete'
}

const CONTEXT_MENU_ID = 'board_element_context_menu';

/**
 * 画布的 context menu
 */
export const BoardElementContextMenu = () => {
  const { hideAll: hideContextMenu } = useContextMenu({ id: CONTEXT_MENU_ID });

  const commands = useCommands();

  /**
   * 处理弹出菜单项的逻辑处理
   */
  const handleItemClick = async (params: ItemParams<{ id: string; uvaNode: IUvaNode }>) => {
    const { event, props } = params;

    switch (event.currentTarget.id) {
      case MENU_ITEM_ACTION.DELETE:
        props && commands.moveToTrash({ movingNodeId: props.uvaNode.id });
        break;
    }

    hideContextMenu();
  };

  return (
    <Menu id={CONTEXT_MENU_ID}>
      <Item disabled>
        <ContextMenuColorPicker colorList={DEFAULT_COLOR_LIST} />
      </Item>
      <Separator />
      <Item id={MENU_ITEM_ACTION.DELETE} onClick={handleItemClick}>
        <Grid container sx={{ width: '100%' }} justifyContent="space-between" alignItems="center">
          <span>删除</span>
          <KeyboardItem keys={['Delete']} />
        </Grid>
      </Item>
    </Menu>
  );
};

export function useBoardElementContextMenu() {
  const { show, hideAll } = useContextMenu({ id: CONTEXT_MENU_ID });

  return [show, hideAll];
}
