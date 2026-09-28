import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isUUID } from "@/lib/utils";
import ProfileClientDetail from "./ProfileClientDetail";

export const revalidate = 60;

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const condition = isUUID(id)
    ? or(eq(profiles.id, id), eq(profiles.slug, id))
    : eq(profiles.slug, id);

  const [profile] = await db
    .select()
    .from(profiles)
    .where(condition);

  if (!profile || profile.status !== "published") {
    notFound();
  }

  return <ProfileClientDetail profile={profile} />;
}
