// Імпортуємо призма-клієнтадля використання типізації призми
import { PrismaClient } from "../generated/prisma";

// Створюємо призма-клієнта для надсилання запитів до БД
export const client = new PrismaClient()