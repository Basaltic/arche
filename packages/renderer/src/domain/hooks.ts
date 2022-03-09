import { instantiation } from './instantiation';
import { IAppUseCase } from './use-case/app';
import { IDocUseCase } from './use-case/doc';
import { IKnowledgeBaseUseCase } from './use-case/knowledge-base';
import { IUserUseCase } from './use-case/user';

export function useAppUseCase() {
  const appUseCase = instantiation.invokeFunction(accessor => accessor.get(IAppUseCase));
  return appUseCase;
}

export function useUserUseCase() {
  const userUseCase = instantiation.invokeFunction(accessor => accessor.get(IUserUseCase));
  return userUseCase;
}

export function useKnowledgeBaseUseCase() {
  const knowledgeBaseUseCase = instantiation.invokeFunction(accessor => accessor.get(IKnowledgeBaseUseCase));
  return knowledgeBaseUseCase;
}

export function getDocUseCase() {
  return instantiation.invokeFunction(a => a.get(IDocUseCase));
}
