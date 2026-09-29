import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
}: StatCardProps) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
}
