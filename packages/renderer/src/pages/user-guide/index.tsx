import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useUserGuideState } from './state';
import { StepWelcome } from './containers/step-welcome';

/**
 * User Guide Page
 * - This Page will show at the first time
 */
export const UserGuidePage = () => {
  const form = useForm();
  const { step } = useUserGuideState();

  const steps = [<StepWelcome />];

  return (
    <FormProvider {...form}>
      <div className="relative w-full h-full center">{steps[step]}</div>
    </FormProvider>
  );
};
