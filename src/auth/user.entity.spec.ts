import { Test } from '@nestjs/testing';
import { UserRepository } from './user.respository';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('UserEntityTest', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.salt = 'testsalt';
    bcrypt.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('return true as password is valid', async () => {
      bcrypt.hash.mockReturnValue('testhash');
      user.password = 'testhash';
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const isValidate = await user.validatePassword('Developer123');
      expect(isValidate).toEqual(true);
      expect(bcrypt.hash).toHaveBeenCalled();
    });

    it('return false as password is invalid', async () => {
      bcrypt.hash.mockReturnValue('developer123');
      user.password = 'wrongpassword';
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const isValidate = await user.validatePassword('Developer123');
      expect(isValidate).toEqual(false);
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });

});
