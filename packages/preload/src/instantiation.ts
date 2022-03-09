import { InstantiationService } from '../../shared/di/instantiationService';
import { ServiceRegistry } from '../../shared/di/service-registry';
import { ServiceCollection } from '../../shared/di/serviceCollection';

const registory = new ServiceRegistry();
const serviceCollection = new ServiceCollection();

const contributedServices = registory.getDescriptors();
for (const [id, descriptor] of contributedServices) {
  serviceCollection.set(id, descriptor);
}

export const instantiation = new InstantiationService(serviceCollection, true);
