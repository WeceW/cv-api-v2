import { define } from 'typeorm-seeding';

import { User } from '../../modules/users/user.entity';

define(User, () => {
  const user = new User();
  return user;
});
