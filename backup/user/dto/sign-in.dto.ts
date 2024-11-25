import { CreateUserDto } from './create-user.dto';

export type SignInDto = Pick<CreateUserDto, 'username' | 'password'>;
