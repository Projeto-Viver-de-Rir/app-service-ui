import { defineStore } from 'pinia';
import { router } from '@/router';
import { container } from 'tsyringe'
import axios from 'axios'
import { accountRepository } from '../repositories/accountRepository'


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        token: 'CfDJ8HA3hAAKLhdMolIlRN94CC-3XAvBM-UslbHTNnwereDKNNJzL-jQ-K4sXq58ocBRtGAYBiYr611KG__xUgFbfDKjXBxDrSNfhSYiQMRDUtBtOLIwOgAPovx1Qw9W1LnOqYNOTq3yNqou4FMDK7nm6H6bFDx4NwnCRCQ3NboHMgE6DUEpPuvdzsw8uD1kYzDRw9E0ZOV_1PYmTMvUPt-1ZQyJTvTdr88JMYFVKV3Bp5ozwruYXuBpEP0Ax4T0sZ0EJR0q19KMlM1V3INi15ytA9c80bM58Zb3JATiDwpL8BMgkvOfNPZ1MiueaCHtpHKJFKvyokWrOxDoAERLIhBFWFT7unTDy4jD1Hb0qSHzVemKqQ0lnkUmMOjxKZIqi_iP9NkZHJG5tsn3ApH2ixNyHjN0A53gl-OG_hju5Z69fhcvIyR0xdBFozSnjFKzeUVrE6ihrRYhsSSY1WsQ-6ctlvM9fX1Lqr0-urJjxmEYDCAb_3rEYGb7JNEng02XK9jhkEfX4ehW5wkoke4NTQe2aKytD9G5wJI8GO3_g5la4vJyouECMtFamYHxEW6GGTn1wZ5a8GDfn81-SxMbvFfMLLd4t074iDu_GxNfv_SJNv9TF3PchtY6w_h_kwl_1uKDjF_xtoReU4js_4RbsLVKQu4V_Eh009uWJucBcsmSY1KaFGiuFrkU9-e6HxQr2DT-a_23-lHeIq7OjCasZISiIictUgF0SGj7nxDKWezgIdBa',
        returnUrl: null
    }),
    actions: {
        async login(email: string, password: string) {

            axios.post('https://localhost:7123/api/identity/login',{
                email:email,
                password:password,
                twoFactorCode:"string",
                twoFactorRecoveryCode:"string"
            }).then(async response =>{
            
                localStorage.setItem('token', response.data.accessToken)
                const repository = container.resolve(accountRepository)
                
                var data = await repository.getCurrentUser();
                this.user = data;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(this.user));
                
                // redirect to previous url or default to home page
                router.push({ name: 'Starter' })

            }).catch(err =>{
                console.log(err);
            })



        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            router.go('/');
            console.log("logout");
        }
    }
});
