import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.interface.js';

@Injectable()
export class UsersService {

    private readonly users: User[] = []

    findAll(): User[] {
        return this.users;
    }

    
    create(name: string, email: string) : User {

        const user: User = {
            id: crypto.randomUUID(),
            name,
            email,
        }

        this.users.push(user);


        return user
    }

    findOne(id: string): User {
        const user = this.users.find((user) => user.id === id)

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found!`)
        }

        return user;
    }


    update(id: string, changes: {name?: string; email?: string;}): User {
        const user = this.findOne(id)

        Object.assign(user, changes)

        return user;
    }


    remove(id: string): User {
        const index = this.users.findIndex((user) => user.id === id)

        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found!`)
        }

        const [deleted] = this.users.splice(index, 1)

        return deleted


    }

}
