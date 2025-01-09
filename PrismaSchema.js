generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  status        String    @default("pending") // pending, pending_approval, approved, rejected
  paymentStatus String    @default("unpaid")  // unpaid, paid
  paymentAmount Float     @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  licenseKeys   License[]
  eas          EA[]
}

model License {
  id        String   @id @default(cuid())
  key       String   @unique
  username  String
  email     String
  status    String   @default("active") // active, inactive
  duration  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    String
}

model EA {
  id           String          @id @default(cuid())
  strategyName String
  ownerName    String
  description  String
  image        String?
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
  user         User           @relation(fields: [userId], references: [id])
  userId       String
  symbols      TradingSymbol[]
}

model TradingSymbol {
  id         String   @id @default(cuid())
  name       String
  volatility Float
  ea         EA       @relation(fields: [eaId], references: [id])
  eaId       String
  }
