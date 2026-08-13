import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/features/pages/api";

type AdminPageEditorLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  props: AdminPageEditorLayoutProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const page = await getPage(id);

  if (!page) {
    notFound();
  }

  return { title: page.title };
}

export default function AdminPageEditorLayout(
  props: AdminPageEditorLayoutProps,
) {
  return props.children;
}
