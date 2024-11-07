-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_errorId_fkey";

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_errorId_fkey" FOREIGN KEY ("errorId") REFERENCES "Error"("id") ON DELETE CASCADE ON UPDATE CASCADE;
