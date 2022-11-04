/*
  Warnings:

  - You are about to drop the column `Img` on the `TrendLive` table. All the data in the column will be lost.
  - You are about to drop the column `TrendTop` on the `Trend` table. All the data in the column will be lost.
  - Added the required column `ImgTop` to the `TrendLive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TrendTopImg` to the `Trend` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrendLive" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SpecTop" TEXT NOT NULL,
    "NameTop" TEXT NOT NULL,
    "ImgTop" TEXT NOT NULL,
    "UrlTopLive" TEXT NOT NULL,
    "NameTopLive" TEXT NOT NULL,
    "TrendId" INTEGER NOT NULL,
    CONSTRAINT "TrendLive_TrendId_fkey" FOREIGN KEY ("TrendId") REFERENCES "Trend" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TrendLive" ("Id", "NameTop", "NameTopLive", "SpecTop", "TrendId", "UrlTopLive") SELECT "Id", "NameTop", "NameTopLive", "SpecTop", "TrendId", "UrlTopLive" FROM "TrendLive";
DROP TABLE "TrendLive";
ALTER TABLE "new_TrendLive" RENAME TO "TrendLive";
CREATE TABLE "new_Trend" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Views" TEXT NOT NULL,
    "Follow" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Tag" TEXT NOT NULL,
    "TrendTopImg" TEXT NOT NULL
);
INSERT INTO "new_Trend" ("Category", "Follow", "Id", "Tag", "Views") SELECT "Category", "Follow", "Id", "Tag", "Views" FROM "Trend";
DROP TABLE "Trend";
ALTER TABLE "new_Trend" RENAME TO "Trend";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
