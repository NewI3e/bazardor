import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import ProfileForm from "@/components/ProfileForm";

function ProfileLoading() {
  return (
    <div className="mx-auto w-full max-w-md animate-pulse space-y-4">
      <div className="h-24 rounded-xl bg-gray-200" />
      <div className="h-40 rounded-xl bg-gray-200" />
    </div>
  );
}

// Session component
async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = session.user;

  async function updateProfile(formData) {
    "use server";

    const name = formData.get("name")?.toString().trim();

    if (!name || name.length > 100) {
      throw new Error("সঠিক নাম লিখুন");
    }

    await auth.api.updateUser({
      body: { name },
      headers: await headers(),
    });

    revalidatePath("/profile");
  }

  return (
    <ProfileForm
      user={user}
      updateProfile={updateProfile}
    />
  );
}

export default function Profilepage() {
  return (
    <main className=" bg-[#F0F6F1] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-6 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="flex justify-center">
          <Suspense fallback={<ProfileLoading />}>
            <ProfileContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}