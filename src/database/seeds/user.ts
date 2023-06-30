import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../modules/users/user.entity';

export default class InitialUserSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().create({
      username: 'wece',
      password: '$2b$10$/0OT28VO8SJzckc6IA9ELujouUfIWVNshgIqVEsvQtvwsm5fnP6s2',
    });
  }
}
