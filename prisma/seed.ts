import { PrismaClient } from "@prisma/client";
import { services, users } from "./data";

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    await prisma.user.create({ data: user });
  }
  for (let service of services) {
    await prisma.service.create({ data: service });
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
