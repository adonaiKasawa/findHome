-- CreateTable
CREATE TABLE "bayeurs" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creditCard" TEXT NOT NULL,
    "hashedRt" TEXT,

    CONSTRAINT "bayeurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propriete" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "video" TEXT,
    "photo" TEXT,
    "bayeursId" INTEGER,

    CONSTRAINT "propriete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "nombrePiece" INTEGER NOT NULL,
    "prix" INTEGER NOT NULL,
    "periodPayement" TEXT NOT NULL,
    "video" TEXT,
    "photo" TEXT,
    "proprieteId" INTEGER,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "piece" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "modelsId" INTEGER,

    CONSTRAINT "piece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evolutionPrix" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "prix" INTEGER NOT NULL,
    "modelsId" INTEGER,

    CONSTRAINT "evolutionPrix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodPayement" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "period" TEXT NOT NULL,
    "modelsId" INTEGER,

    CONSTRAINT "periodPayement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bayeurs_email_key" ON "bayeurs"("email");

-- AddForeignKey
ALTER TABLE "propriete" ADD CONSTRAINT "propriete_bayeursId_fkey" FOREIGN KEY ("bayeursId") REFERENCES "bayeurs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_proprieteId_fkey" FOREIGN KEY ("proprieteId") REFERENCES "propriete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "piece" ADD CONSTRAINT "piece_modelsId_fkey" FOREIGN KEY ("modelsId") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolutionPrix" ADD CONSTRAINT "evolutionPrix_modelsId_fkey" FOREIGN KEY ("modelsId") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "periodPayement" ADD CONSTRAINT "periodPayement_modelsId_fkey" FOREIGN KEY ("modelsId") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;
