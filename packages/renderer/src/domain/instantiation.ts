import { InstantiationService } from '../../../shared/di/instantiationService';
import { ServiceRegistry } from '../../../shared/di/service-registry';
import { ServiceCollection } from '../../../shared/di/serviceCollection';
import { IAppDb, AppDb } from './db/app.db';
import { IdService, IIdService } from './service/id-service';
import { AppUseCase, IAppUseCase } from './use-case/app';
import { DocUseCase, IDocUseCase } from './use-case/doc';
import { IUserUseCase, UserUseCase } from './use-case/user';

const registory = new ServiceRegistry();
const serviceCollection = new ServiceCollection();

registory.regiser(IAppDb, AppDb, true);

registory.regiser(IIdService, IdService, true);

registory.regiser<AppUseCase, any>(IAppUseCase, AppUseCase, true);
registory.regiser<UserUseCase, any>(IUserUseCase, UserUseCase, true);
registory.regiser<DocUseCase, any>(IDocUseCase, DocUseCase, true);

const contributedServices = registory.getDescriptors();
for (const [id, descriptor] of contributedServices) {
  serviceCollection.set(id, descriptor);
}

export const instantiation = new InstantiationService(serviceCollection, true);
