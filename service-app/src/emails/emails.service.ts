import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class EmailsService {
    constructor(private prisma: PrismaService) {}

    async getEmails() {
        return await this.prisma.email.findMany();
    }

    async subscribeUser(email: string) {
        const existent = await this.prisma.email.findUnique({where:{email}});

        if (existent && existent.is_subscribed) throw new HttpException('Conflict', HttpStatus.CONFLICT);

        try {

            if (existent) return await this.prisma.email.update({
                where: {email},
                data: {
                    is_subscribed: true
                },
                select: {
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return await this.prisma.email.create({
                data: {
                    email,
                    is_subscribed: true
                },
                select: {
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email is subscribed')
                }
            }
            throw new Error(error);
        }
    }

    async unSubscribeUser(email: string) {
        const existent = await this.prisma.email.findUnique({where:{email}});

        if (!existent) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        return await this.prisma.email.update({
            where: {
                email
            },
            data: {
                is_subscribed: false
            }
        });
    }
}