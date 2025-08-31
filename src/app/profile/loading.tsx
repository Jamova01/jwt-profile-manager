import { ProfileSkeleton } from "@/components/organisms/ProfileSkeleton";

export default function Loading() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <ProfileSkeleton />
    </div>
  );
}
