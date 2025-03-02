-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_id" TEXT NOT NULL,
    "project_title" TEXT NOT NULL,
    "project_subtitle" TEXT NOT NULL,
    "project_cover_img" TEXT NOT NULL,
    "project_tech_stacks" TEXT NOT NULL,
    "project_link" TEXT NOT NULL,
    "project_status" TEXT NOT NULL,
    "personal" BOOLEAN NOT NULL,
    "project_description" TEXT NOT NULL,
    "technical_specifications" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "feature_id" INTEGER NOT NULL,
    "feature_name" TEXT NOT NULL,
    "feature_description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "ProjectFeature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectGoal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal_id" INTEGER NOT NULL,
    "goal_name" TEXT NOT NULL,
    "goal_description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "ProjectGoal_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectTimeline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "milestone_id" INTEGER NOT NULL,
    "milestone_name" TEXT NOT NULL,
    "milestone_date" TEXT NOT NULL,
    "milestone_description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "ProjectTimeline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "member_id" INTEGER NOT NULL,
    "member_name" TEXT NOT NULL,
    "member_role" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "TeamMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_id_key" ON "Project"("project_id");
