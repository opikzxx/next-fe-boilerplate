import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/lib/i18n-navigation";

type AuthCardProps = {
  title: string;
  children: React.ReactNode;
  footerText?: string;
  footerLinkLabel?: string;
  footerLinkHref?: string;
};

export function AuthCard(props: AuthCardProps) {
  return (
    <Card className="bg-white w-full max-w-md gap-4 md:gap-8 border-none py-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl md:text-3xl text-center font-bold">
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-0">
        {props.children}
        {props.footerText && props.footerLinkLabel && props.footerLinkHref && (
          <p className="text-foreground text-center text-sm">
            {props.footerText}{" "}
            <Link
              href={props.footerLinkHref}
              className="text-primary font-medium hover:underline"
            >
              {props.footerLinkLabel}
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
