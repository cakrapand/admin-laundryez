import prisma from "@/lib/db";

export async function GET() {
  const services = await prisma.service.findMany();

  return Response.json({
    status: 200,
    services,
  });
}
