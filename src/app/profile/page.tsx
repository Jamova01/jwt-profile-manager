"use client";

import { useProfile } from "@/hooks/useProfile";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  const { profile, loading } = useProfile();

  if (loading) return <ProfileSkeleton />;

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-center">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="pb-8">
            <p className="text-center text-sm text-muted-foreground">
              No se pudo cargar el perfil.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <ProfileForm profile={profile} />
    </div>
  );
}
