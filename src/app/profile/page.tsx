"use client";

import { useProfile } from "@/hooks/profile/useProfile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { ProfileForm } from "@/components/organisms/ProfileForm";

export default function ProfilePage() {
  const { profile, isLoading, error } = useProfile();

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-center">Error</CardTitle>
          </CardHeader>
          <CardContent className="pb-8">
            <p className="text-center text-sm text-muted-foreground">
              No se pudo cargar el perfil. Inténtalo de nuevo más tarde.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading || !profile) {
    return null;
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <ProfileForm profile={profile} />
    </div>
  );
}
