-- CreateTable
CREATE TABLE "ProjectIndex" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_id" TEXT NOT NULL,
    "project_title" TEXT NOT NULL,
    "project_subtitle" TEXT NOT NULL,
    "project_cover_img" TEXT NOT NULL,
    "project_tech_stacks" TEXT NOT NULL,
    "project_link" TEXT NOT NULL,
    "github_link" TEXT,
    "project_status" TEXT NOT NULL,
    "personal" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectIndex_project_id_key" ON "ProjectIndex"("project_id");
