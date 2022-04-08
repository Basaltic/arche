import { useFormContext } from 'react-hook-form';
import { createStore } from 'rethos';

/**
 * User Guide Page Form Value Def
 */
export type TUserGuideFormValues = {
  /**
   * 用户的名字
   */
  username: string;

  /**
   * 知识库的名字
   */
  knowledgeBaseName: string;
};

export const useUserGuideForm = () => useFormContext<TUserGuideFormValues>();

/**
 * User Guide Page State Def
 */
export type TUserGuideState = {
  /**
   * 新人引导 -当前步骤
   */
  step: number;
};

export const defaultUserGruideState: TUserGuideState = {
  step: 0,
};

export const [useUserGuideState, useUserGuideAction] = createStore(defaultUserGruideState, {
  nextStep: (state: TUserGuideState) => {
    state.step += 1;
  },
});
