import { EElementType } from './element.types';

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

const dragItemTypeFromMenu: string[] = [];
const dragItemTypeFromBoard: string[] = [];
const dragItemTypeFromTrash: string[] = [];
const dragItemTypeFromColumn: string[] = [];

for (const key of enumKeys(EElementType)) {
  const type = EElementType[key];
  dragItemTypeFromMenu.push(`${type}_menu`);
  dragItemTypeFromBoard.push(`${type}_board`);
  dragItemTypeFromTrash.push(`${type}_trash`);
  dragItemTypeFromColumn.push(`${type}_column`);
}

export { dragItemTypeFromMenu, dragItemTypeFromBoard, dragItemTypeFromTrash, dragItemTypeFromColumn };
