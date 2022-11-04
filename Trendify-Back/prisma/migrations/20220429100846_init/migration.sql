/*
  Warnings:

  - Added the required column `NameTopLive` to the `TrendLive` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrendLive" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SpecTop" TEXT NOT NULL,
    "NameTop" TEXT NOT NULL,
    "Img" TEXT NOT NULL,
    "UrlTopLive" TEXT NOT NULL,
    "NameTopLive" TEXT NOT NULL,
    "TrendId" INTEGER NOT NULL,
    CONSTRAINT "TrendLive_TrendId_fkey" FOREIGN KEY ("TrendId") REFERENCES "Trend" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TrendLive" ("Id", "Img", "NameTop", "SpecTop", "TrendId", "UrlTopLive") SELECT "Id", "Img", "NameTop", "SpecTop", "TrendId", "UrlTopLive" FROM "TrendLive";
DROP TABLE "TrendLive";
ALTER TABLE "new_TrendLive" RENAME TO "TrendLive";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
