'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tool } from '@/lib/arcade-client';
import { Wrench, Lock } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick?: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{tool.name}</CardTitle>
          </div>
          {tool.requires_auth && (
            <Lock className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {tool.description || 'No description available'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tool.category && (
            <Badge variant="secondary">{tool.category}</Badge>
          )}
          {tool.requires_auth && (
            <Badge variant="outline">Auth Required</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

