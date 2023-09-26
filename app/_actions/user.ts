"use server"

import { db } from "@/lib/db"
import { userSchema } from "@/lib/validations/user"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const updateUserProfileAction = async (
   inputs: z.infer<typeof userSchema> & {
      userId: string
   }
) => {
   try {
      await db.user.update({
         where: {
            id: inputs.userId,
         },
         data: {
            name: inputs.name,
            image: inputs.image,
         },
      })

      revalidatePath("/profile")
   } catch (error) {
      throw new Error("Profile update failed")
   }
}
