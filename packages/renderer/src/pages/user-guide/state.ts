import { useFormContext } from 'react-hook-form';
import create, { useStore } from 'zustand';

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

export const useGuideStoe = create<TUserGuideState>((set) => ({
  step: 0,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
}));

export const useUserGuideState = () => useStore(useGuideStoe);
