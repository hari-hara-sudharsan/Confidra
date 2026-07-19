import { PrismaClient, SystemRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create System Admin Role
  const adminRole = await prisma.role.create({
    data: {
      name: 'Super Administrator',
      systemRole: SystemRole.SUPER_ADMIN,
    },
  });

  // Create Mock Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Acme Corp',
      apiKey: 'sk_test_123456789',
      settings: {
        create: {
          billingTier: 'PRO',
          brandingConfig: { color: '#E11D48' },
        },
      },
    },
  });

  // Create Mock User
  const user = await prisma.user.create({
    data: {
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      email: 'admin@acmecorp.com',
      memberships: {
        create: {
          organizationId: org.id,
          roleId: adminRole.id,
        },
      },
    },
  });

  console.log('Seed completed successfully.', { orgId: org.id, userId: user.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
