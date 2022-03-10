import { instantiation } from './instantiation';
import { IAppUseCase } from './use-case/app';
import { IDocUseCase } from './use-case/doc';
import { IUserUseCase } from './use-case/user';

export function useAppUseCase() {
  const appUseCase = instantiation.invokeFunction(accessor => accessor.get(IAppUseCase));
  return appUseCase;
}

export function useUserUseCase() {
  const userUseCase = instantiation.invokeFunction(accessor => accessor.get(IUserUseCase));
  return userUseCase;
}

export function getDocUseCase() {
  return instantiation.invokeFunction(a => a.get(IDocUseCase));
}
