-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('INR', 'USD');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('remote', 'hybrid', 'office');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'HR');

-- CreateEnum
CREATE TYPE "EmployementType" AS ENUM ('Full_time', 'Part_time', 'Internship', 'Contract');

-- CreateEnum
CREATE TYPE "DegreeType" AS ENUM ('BTech', 'MTech', 'BCA', 'MCA');

-- CreateEnum
CREATE TYPE "FieldOfStudyType" AS ENUM ('AI', 'Machine_Learning', 'CS', 'Mechanical');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "avatar" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "skills" TEXT[],
    "resume" TEXT,
    "resumeUpdateDate" TIMESTAMP(3),
    "companyId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLogo" TEXT,
    "companyEmail" TEXT NOT NULL,
    "companyBio" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "company_name" TEXT NOT NULL,
    "company_email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" "EmployementType" NOT NULL,
    "work_mode" "WorkMode" NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'INR',
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "EmploymentType" "EmployementType" NOT NULL,
    "currentWorkStatus" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "instituteName" TEXT NOT NULL,
    "degree" "DegreeType" NOT NULL,
    "fieldOfStudy" "FieldOfStudyType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectThumbnail" TEXT,
    "projectGithub" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_companyId_key" ON "User"("companyId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
