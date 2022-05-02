import 'katex/dist/katex.css';
import cs from 'classnames';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { TElementViewProps } from '../element.types';
import type { TMathElementState } from '.';
import katex from 'katex';
import { useObserveElementMeta, useObserveElementState } from '../../../hooks/node.hooks';
import { debounce } from 'lodash';
import { useCommandExecutor, useCommands } from '../../../commands/commands.hooks';
import { EditableTitle } from '/@/components/editable-title';
import { ElementCommonTitle } from '../../containers/element-common-title';

/**
 * Math Fomula Element View Component Entry
 */
export const MathElementView = memo((props: TElementViewProps) => {
  switch (props.where) {
    case 'dragging':
    case 'trash':
      return <ViewStatic {...props} />;
    case 'default':
    case 'board':
    default:
      return <ViewInBoard {...props} />;
  }
});

/**
 * Staitc View which is readonly
 */
export const ViewStatic = (props: TElementViewProps) => {
  const { id } = props;

  const katexEle = useRef(null);

  const { formula } = useObserveElementState<TMathElementState>(id);

  useEffect(() => {
    if (katexEle.current && formula) {
      katex.render(formula, katexEle.current, {
        throwOnError: false,
      });
    }
  }, [formula]);

  return (
    <div className="relative bg-white shadow-inner">
      <div className="relative p-1 flex items-center rounded-md">
        <div ref={katexEle}></div>
      </div>
    </div>
  );
};

export const ViewInBoard = (props: TElementViewProps) => {
  const { id, isSelected } = props;

  const katexEle = useRef(null);

  const commands = useCommands();
  const commandExecutor = useCommandExecutor();
  const { formula } = useObserveElementState<TMathElementState>(id);

  useEffect(() => {
    if (katexEle.current && formula) {
      katex.render(formula, katexEle.current, {
        throwOnError: false,
      });
    }
  }, [formula]);

  const onFormulaLatexChange = useCallback((v: string) => {
    commandExecutor.execute(commands.changeState<TMathElementState>(id, { formula: v }));
  }, []);

  return (
    <div className="relative rounded-md bg-white shadow-inner" style={{ minWidth: 200 }}>
      <div className="pt-2 m-auto text-center" style={{ maxWidth: '90%' }}>
        <ElementCommonTitle id={id} />
      </div>
      <div className="relative p-2 flex items-center">
        <div ref={katexEle}></div>
      </div>
      <FormluaLatexInput hidden={!isSelected} defaultValue={formula} onChange={debounce(onFormulaLatexChange, 500)} />
    </div>
  );
};

function FormluaLatexInput(props: { defaultValue: string; hidden?: boolean; onChange: (v: string) => void }) {
  const { defaultValue, hidden = false, onChange } = props;

  const [formulaLatex, setFormulaLatex] = useState(defaultValue);

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setFormulaLatex(v);
    onChange(v);
  };

  const cn = cs('absolute textarea textarea-info text-slate-500 mt-2', hidden && 'hidden');

  return <textarea className={cn} style={{ minHeight: '100px' }} value={formulaLatex} onChange={handleValueChange}></textarea>;
}
