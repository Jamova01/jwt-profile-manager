"use client";

import { useEffect, useState, useCallback } from "react";
import { ProfileApiResponse } from "@/types/profile";
import { getProfile } from "@/services/profile";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getProfile();
      setProfile(data);
    } catch {
      setError("Error al cargar el perfil");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, refetch: fetchProfile };
}
