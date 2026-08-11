import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer/footer";
import { Navbar } from "@/components/layout/navbar/navbar";

type MainLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function MainLayout(props: MainLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 flex-col pt-[70px]">
        {props.children}
      </div>
      <Footer locale={locale} />
    </div>
  );
}
