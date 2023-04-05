-- CreateTable
CREATE TABLE "_RoleModelToUserModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RoleModelToUserModel_A_fkey" FOREIGN KEY ("A") REFERENCES "RoleModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoleModelToUserModel_B_fkey" FOREIGN KEY ("B") REFERENCES "UserModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoleModelToUserModel_AB_unique" ON "_RoleModelToUserModel"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleModelToUserModel_B_index" ON "_RoleModelToUserModel"("B");
