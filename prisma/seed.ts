import prisma from './prisma-client';
import { hashSync } from 'bcrypt';
import { categories, ingredients, products } from './constants';

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const lemonade = await prisma.product.create({
    data: {
      name: 'Лимонад',
      imageUrl:
        'https://media.dodostatic.net/image/r:292x292/11EE7D61AAE50A4CB880D842915C82DC.avif',
      categoryId: 5,
      ingredients: {},
    },
  });

  for (const product of products) {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
      },
    });

    await prisma.productItem.createMany({
      data: [
        { productId: newProduct.id, price: 170, size: 1 },
        { productId: newProduct.id, price: 280, size: 2 },
        { productId: newProduct.id, price: 310, size: 3 },
      ],
    });
  }

  await prisma.productItem.createMany({
    data: [
      { productId: pizza1.id, pizzaType: 1, size: 1, price: 310 },
      { productId: pizza1.id, pizzaType: 2, size: 2, price: 420 },
      { productId: pizza1.id, pizzaType: 2, size: 3, price: 500 },

      { productId: pizza2.id, pizzaType: 1, size: 1, price: 200 },
      { productId: pizza2.id, pizzaType: 1, size: 2, price: 280 },
      { productId: pizza2.id, pizzaType: 1, size: 3, price: 330 },
      { productId: pizza2.id, pizzaType: 2, size: 1, price: 200 },
      { productId: pizza2.id, pizzaType: 2, size: 2, price: 280 },
      { productId: pizza2.id, pizzaType: 2, size: 3, price: 330 },

      { productId: pizza3.id, pizzaType: 1, size: 1, price: 410 },
      { productId: pizza3.id, pizzaType: 2, size: 2, price: 470 },
      { productId: pizza3.id, pizzaType: 2, size: 3, price: 515 },
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '1111'
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222'
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
