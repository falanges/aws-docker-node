import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: '1',
      name: 'Matias',
      email: 'mp@xd.ed',
      role: 'INTERN',
    },
    {
      id: '2',
      name: 'John',
      email: 'asef@esf.gr',
      role: 'ENGINEER',
    },
    {
      id: '3',
      name: 'Jane',
      email: 'sef@342.fe',
      role: 'ADMIN',
    },
    {
      id: '4',
      name: 'Maryjane',
      email: 'sefjane@3242.fef',
      role: 'ADMIN',
    },
    {
      id: '5',
      name: 'Marihuane',
      email: 'mary@roots.fe',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException(`No users with role ${role} found`);
      }
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id.toString());
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => +b.id - +a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id.toString()) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id.toString());

    return removedUser;
  }
}
