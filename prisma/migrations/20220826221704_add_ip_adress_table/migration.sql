-- CreateTable
CREATE TABLE "ip_addresses" (
    "id" TEXT NOT NULL,
    "shortId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ip_addresses_pkey" PRIMARY KEY ("id")
);
