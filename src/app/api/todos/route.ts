import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) { 
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get("take") ?? "10")
  const skip = Number(searchParams.get("skip") ?? "10")

  if(isNaN(+take)) {
    return NextResponse.json({ mesage: 'Take debe ser un vbalor número' })
  }


  if(isNaN(+skip)) {
    return NextResponse.json({ skip: 'Take debe ser un valor número' })
  }
  
  const todos = await prisma.todo.findMany({
    take: +take
  })

  return NextResponse.json(todos)

}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false) // !TODO
})

export async function POST(request: Request) { 
  
  try {
    const { complete, description } = await postSchema.validate(await request.json()) 

    const todo = await prisma.todo.create({ data: { complete, description } })

    return NextResponse.json(todo)

  } catch (error) {
    return NextResponse.json(error, { status: 400 })
    
  }


}