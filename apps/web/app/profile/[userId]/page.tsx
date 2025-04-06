import { prismaClient } from "../../../config/prisma.config"

export default async function ProfilePage({ params: { userId } }: { params: { userId: string } }){
    const user = await prismaClient.user.findFirst({
        where:{
            id: userId
        }
    })

    return <div>
        Profile
        {user?.name}
    </div>
}