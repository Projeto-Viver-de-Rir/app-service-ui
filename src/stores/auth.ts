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
        token: 'CfDJ8HA3hAAKLhdMolIlRN94CC_F07tnMBJeWWyBo2hd4jh4qySo6iE2TYvAe91em1Gp_qim7CRU3F3L-FYuQdkVP5pDT4gHCHCAL54wfFvvEUyqxUs1IpRnMusAwnFBgyRKPBRW1aNKW6viiP4ypJAD_mmnSkMyGCVcgmCmJRvJpqb0psQ_ILlqNbCuHqK4RZtmvqDPdbCBsVgku_LekUUjXmGp3lTWX-NuA9_OQiUy4lJxq2zXnXgaQAiGXhTrLzrVfKveTr73ujmbdSKVxJx1loyVSiivmhZWUukEGC27to0MjNiVk_Gxxahxh0T-hv6cmGZSnvvYIk94_MBlr0Uzh_iaDbMkkPKViDISYFIYhDrgRd5foSvMq2ry2nzJNLZv6bJIVGe4PmN333DlV7RsHxELXViFBtpD5PBT0qJGx8m5mQMimYASKnArCW7EvejjHm0K2MQCJysTbagm2rC_BVigFW0QddotEEJ-TV2z_VUk53WAhREfp_KcjzIxfmh2DwE29tzxxrzK7TwbSZKLpLCKdtBwRFENSnh26whvDISr85AXiGwUCguaYv-kbqyqSw79ZsZMGpA0gc8JMRCXrAiSzECfAkkyd6x0qrgrLm_rN5fjDEQkGXQl_BdfLA8CMYiF8TJgZoPtWDEbaWmLU1M5Mbk2f_bi_AEtgsC1RvNl1WpZHQKNNZyzm8d7fsDsnP4ljurpZOK1fmok4X8ecKvQuDHO7Ds2L6FXaWjd7sQg',
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
