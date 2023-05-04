# backend-rent-home

## install project
```
npm install 
```
## run project
```
npm run dev
```
ต้องมี nodemon ใน dependencies  นะแจ๊ะ

## สร้าง migration database
```
npx sequelize-cli migration:generate --name create-posts
```

## use migration
```
npx sequelize-cli db:migrate
```

## undo migration
```
npx sequelize-cli db:migrate:undo
```
