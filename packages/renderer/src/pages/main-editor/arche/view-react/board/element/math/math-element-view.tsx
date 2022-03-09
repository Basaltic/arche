import 'katex/dist/katex.css';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { TElementViewProps } from '../element.types';
import type { TMathElementState } from '.';
import katex from 'katex';
import { useObserveElementState } from '../../../hooks/node.hooks';
import { debounce } from 'lodash';
import { useCommandExecutor, useCommands } from '../../../hooks/commands.hooks';

/**
 * Math Fomula Element View Component
 */
export const MathElementView = memo((props: TElementViewProps) => {
  const { id } = props;

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

  console.log(formula);

  const onFormulaLatexChange = useCallback((v: string) => {
    commandExecutor.execute(commands.changeState<TMathElementState>(id, { formula: v }));
  }, []);

  return (
    <div className="relative">
      <div className="relative p-1 flex items-center rounded-md bg-white shadow-inner">
        <div ref={katexEle}></div>
      </div>
      <FormluaLatexInput defaultValue={formula} onChange={debounce(onFormulaLatexChange, 500)} />
    </div>
  );
});

function FormluaLatexInput(props: { defaultValue: string; onChange: (v: string) => void }) {
  const { defaultValue, onChange } = props;

  const [formulaLatex, setFormulaLatex] = useState(defaultValue);

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setFormulaLatex(v);
    onChange(v);
  };

  return <textarea className="absolute textarea textarea-info" value={formulaLatex} onChange={handleValueChange}></textarea>;
}
