import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 
 

  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin','client','super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' },
        ]
      }
    }
  });


  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma', complete: true },
  //     { description: 'Piedra de la mente' },
  //     { description: 'Piedra del Tiempo' },
  //     { description: 'Piedra del Realidad' },
  //     { description: 'Piedra del Espacio' },
      
  //   ]
  // })

  return NextResponse.json({
    message: "Seed Executed"
  })
}