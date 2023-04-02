-- CreateTable
CREATE TABLE "RoleModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleModel_value_key" ON "RoleModel"("value");
