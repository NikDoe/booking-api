-- CreateTable
CREATE TABLE "UserModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_username_key" ON "UserModel"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");
