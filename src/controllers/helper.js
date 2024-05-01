import { PrismaClient } from '@prisma/client'

'use strict';

const prismaPartial = (client) => (f, ...args) => f(client, args);


export default prismaPartial