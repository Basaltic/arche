import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useUserGuideState } from './state';
import { StepWelcome } from './containers/step-welcome';
import * as Y from 'yjs';

/**
 * User Guide Page
 * - This Page will show at the first time
 */
export const UserGuidePage = () => {
  const form = useForm();
  const { step } = useUserGuideState();

  const steps = [<StepWelcome />];

  const handleTest = async () => {
    // console.log(window.appdb());

    // const knex = window.appdb().knex;
    // await knex.schema.createTableIfNotExists('test', (table) => {
    //   table.increments('id');
    //   table.binary('content');
    // });

    const doc = new Y.Doc();
    doc.getMap().set('a', 'abc');

    const stateUpdate = Y.encodeStateAsUpdateV2(doc);

    window.appdb(stateUpdate);

    // await knex.table('test').insert({ content: stateUpdate });

    // const result: any = await knex.select().from('test').first();
    // console.log(result);
  };

  return (
    <FormProvider {...form}>
      <div className="relative w-full h-full center">{steps[step]}</div>
      <button onClick={handleTest}>test</button>
    </FormProvider>
  );
};
