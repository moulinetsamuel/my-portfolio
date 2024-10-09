import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Download, Mail } from 'lucide-react';

export default function StatsOverview() {
  const stats = [
    { title: 'Visites totales', value: 1234, icon: Eye },
    { title: 'Téléchargements CV', value: 56, icon: Download },
    { title: 'Messages reçus', value: 23, icon: Mail },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
