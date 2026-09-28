import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, or, ne, and, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { isUUID } from "@/lib/utils";
import ProjectDetailClientView from "./ProjectDetailClientView";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const condition = isUUID(id)
    ? or(eq(projects.id, id), eq(projects.slug, id))
    : eq(projects.slug, id);

  const [project] = await db.select().from(projects).where(condition);

  if (!project) {
    return {
      title: "Case Study Not Found | Tree Media",
    };
  }

  return {
    title: `${project.title} | Case Study | Tree Media`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const condition = isUUID(id)
    ? or(eq(projects.id, id), eq(projects.slug, id))
    : eq(projects.slug, id);

  const [project] = await db.select().from(projects).where(condition);

  if (!project || project.status !== "published") {
    notFound();
  }

  // Fetch related projects
  const relatedProjects = await db
    .select()
    .from(projects)
    .where(and(eq(projects.status, "published"), ne(projects.id, project.id)))
    .orderBy(desc(projects.isFeatured), desc(projects.createdAt))
    .limit(3);

  return (
    <ProjectDetailClientView
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
