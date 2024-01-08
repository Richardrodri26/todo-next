import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) { 
 

  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: 'Piedra del alma', complete: true },
      { description: 'Piedra de la mente' },
      { description: 'Piedra del Tiempo' },
      { description: 'Piedra del Realidad' },
      { description: 'Piedra del Espacio' },
      
    ]
  })

  return NextResponse.json({
    message: "Seed Executed"
  })
}