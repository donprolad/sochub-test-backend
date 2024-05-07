-- AlterTable
ALTER TABLE "clients"."User" ADD COLUMN     "account_locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "failed_logins" INTEGER NOT NULL DEFAULT 0;
