import { Body, Controller, Get, Post, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service.js';



@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Post()
    create(@Body() body: {name: string; email: string}) {
        return this.usersService.create(body.name, body.email);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: {name?: string; email?: string}) {
        return this.usersService.update(id, body)
    }
}   
