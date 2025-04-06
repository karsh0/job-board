import { prismaClient } from "../../../config/prisma.config";

export default async function ProfilePage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  try {
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-red-500 text-lg font-semibold">User not found</p>
        </div>
      );
    }

    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p className="text-lg font-medium text-gray-700">
            <span className="text-gray-500">Name:</span> {user.name}
          </p>
          <p className="text-md text-gray-600 mt-2">
            <span className="text-gray-500">Email:</span> {user.email}
          </p>
          {/* You can add more user details here */}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }
}
