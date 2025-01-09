'use server'

import { cookies } from 'next/headers'
import { hash, compare } from 'bcryptjs'
import { prisma } from './db'

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await hash(password, 12)

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    }
  })

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user

  return { success: true, user: userWithoutPassword }
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      licenseKeys: true,
      eas: {
        include: {
          symbols: true
        }
      }
    }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  // Verify password
  const isValid = await compare(password, user.password)
  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user

  return { success: true, user: userWithoutPassword }
}
