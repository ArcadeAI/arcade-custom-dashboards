'use client';

import { useEffect, useState } from 'react';
import { arcadeClient, AuthStatus } from '@/lib/arcade-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AuthPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAuthStatus() {
      try {
        setLoading(true);
        setError(null);

        const status = await arcadeClient.getAuthStatus();
        setAuthStatus(status);
      } catch (err: any) {
        console.error('Auth status error:', err);
        setError(err.message || 'Failed to load authorization status');
      } finally {
        setLoading(false);
      }
    }

    loadAuthStatus();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Auth Status</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Authorization</h1>
        <p className="text-muted-foreground mt-2">
          Manage your connected accounts and permissions
        </p>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Your Arcade account details</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          ) : authStatus ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Email:</span>
                <span className="text-sm">{authStatus.user.email}</span>
              </div>
              {authStatus.user.name && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Name:</span>
                  <span className="text-sm">{authStatus.user.name}</span>
                </div>
              )}
              {authStatus.user.organization && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Organization:</span>
                  <span className="text-sm">{authStatus.user.organization}</span>
                </div>
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Connected Accounts</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </>
          ) : authStatus && authStatus.connections.length > 0 ? (
            authStatus.connections.map((connection) => {
              const statusConfig = {
                connected: {
                  icon: CheckCircle,
                  variant: 'success' as const,
                  color: 'text-green-600',
                },
                disconnected: {
                  icon: XCircle,
                  variant: 'destructive' as const,
                  color: 'text-red-600',
                },
                expired: {
                  icon: Clock,
                  variant: 'warning' as const,
                  color: 'text-yellow-600',
                },
              };

              const config = statusConfig[connection.status];
              const StatusIcon = config.icon;

              return (
                <Card key={connection.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg capitalize">
                          {connection.provider}
                        </CardTitle>
                      </div>
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <Badge variant={config.variant} className="w-fit">
                      {connection.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    {connection.connected_at && (
                      <p className="text-xs text-muted-foreground">
                        Connected: {new Date(connection.connected_at).toLocaleDateString()}
                      </p>
                    )}
                    {connection.scopes && connection.scopes.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Scopes:</p>
                        <div className="flex flex-wrap gap-1">
                          {connection.scopes.slice(0, 3).map((scope, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {scope}
                            </Badge>
                          ))}
                          {connection.scopes.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{connection.scopes.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No connected accounts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

