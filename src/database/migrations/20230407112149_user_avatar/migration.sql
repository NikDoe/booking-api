-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'U',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_UserModel" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "UserModel";
DROP TABLE "UserModel";
ALTER TABLE "new_UserModel" RENAME TO "UserModel";
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
