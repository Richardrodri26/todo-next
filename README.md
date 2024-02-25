# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ```npm i``` luego ``` npm run dev ```
5. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```
6. Ejecutar el SEED para [crear la base de datos](localhost:3000/api/seed)

## Nota: Usuario por defecto
__usuario__ test1@google.com
__password__ 123456

# Prisma Commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate

```