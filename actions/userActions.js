"use server"

import connectDb from "@/db/connectDb"
import User from "@/models/User"

export async function updateProfile(newUsername, email) {
  try {
    await connectDb();
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    user.username = newUsername;
    await user.save();

    return { success: true, message: "Username updated!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
