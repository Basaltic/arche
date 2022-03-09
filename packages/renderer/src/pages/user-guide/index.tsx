import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useUserGuideState } from './state';
import { StepWelcome } from './containers/step-welcome';
import { StepDone } from './containers/step-done';
import { StepKnowledgeBaseSetting } from './containers/step-knowledge-base-setting';

/**
 * User Guide Page
 *
 * 1. First Use Guide
 * 2. Set up knowledge base path (optional) & name
 */
export const UserGuidePage = () => {
  const form = useForm();
  const { step } = useUserGuideState();

  const steps = [<StepWelcome />, <StepKnowledgeBaseSetting />, <StepDone />];

  return (
    <FormProvider {...form}>
      <div className="relative w-full h-full center">{steps[step]}</div>
    </FormProvider>
  );
};
