'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MCPServer } from '@/lib/arcade-client';
import { Server } from 'lucide-react';

interface ServerCardProps {
  server: MCPServer;
  onClick?: () => void;
}

export function ServerCard({ server, onClick }: ServerCardProps) {
  const statusColors = {
    active: 'success',
    inactive: 'secondary',
    error: 'destructive',
  } as const;

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{server.name}</CardTitle>
          </div>
          <Badge variant={statusColors[server.status]}>
            {server.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {server.description || 'No description available'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {server.tools_count !== undefined && (
          <p className="text-sm text-muted-foreground">
            {server.tools_count} {server.tools_count === 1 ? 'tool' : 'tools'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

