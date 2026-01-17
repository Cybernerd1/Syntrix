import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useContext } from 'react'
import { useMutation } from 'convex/react'
import uuid4 from 'uuid4'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'

const SignInDialog = ({ openDialog, closeDialog }) => {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const convex = useConvex()

    const CreateUser = useMutation(api.users.createUser)

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);

            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            const user = userInfo.data

            // Create or update user in Convex
            await CreateUser({ name: user?.name, email: user?.email, picture: user?.picture, uid: uuid4() })

            // Fetch the complete user object from Convex (including _id)
            const convexUser = await convex.query(api.users.getUsers, {
                email: user?.email
            })

            console.log('Convex User:', convexUser)

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(convexUser))
            }

            // Store the complete Convex user object (with _id) in context
            setUserDetail(convexUser)
            closeDialog(false)
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <div className='flex flex-col justify-center gap-3'>
                        <h2 className='font-bold text-center text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
                        <p className='mt-2 text-center text-muted-foreground'>{Lookup.SIGNIN_SUBHEADING}</p>
                        <Button className='bg-blue-500 text-white hover:bg-blue-400 mt-3' onClick={googleLogin}>Sign In with Google</Button>
                        <p className='text-sm text-muted-foreground text-center'>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog