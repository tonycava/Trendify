/*
  Warnings:

  - Added the required column `TrendTop` to the `Trend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Img` to the `TrendLive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UrlTopLive` to the `TrendLive` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trend" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Views" TEXT NOT NULL,
    "Follow" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Tag" TEXT NOT NULL,
    "TrendTop" TEXT NOT NULL
);
INSERT INTO "new_Trend" ("Category", "Follow", "Id", "Tag", "Views") SELECT "Category", "Follow", "Id", "Tag", "Views" FROM "Trend";
DROP TABLE "Trend";
ALTER TABLE "new_Trend" RENAME TO "Trend";
CREATE TABLE "new_TrendLive" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SpecTop" TEXT NOT NULL,
    "NameTop" TEXT NOT NULL,
    "Img" TEXT NOT NULL,
    "UrlTopLive" TEXT NOT NULL,
    "TrendId" INTEGER NOT NULL,
    CONSTRAINT "TrendLive_TrendId_fkey" FOREIGN KEY ("TrendId") REFERENCES "Trend" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TrendLive" ("Id", "NameTop", "SpecTop", "TrendId") SELECT "Id", "NameTop", "SpecTop", "TrendId" FROM "TrendLive";
DROP TABLE "TrendLive";
ALTER TABLE "new_TrendLive" RENAME TO "TrendLive";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
