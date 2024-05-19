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
        token: 'CfDJ8IRGK1wTFPVCq5uYil_xAmQRW8nuq4CFMpYZEAR76bkSdyQ00CQcRwgYJjK1mn8zqooCahPv6S9sEzrLzrS75qI6l4Hbj9Y1A6TilTOuzXXmGAgPQzTyVieycN3VAg8EqCRZHRth5ugpQSDUCHzKhXpJ05RNUegF7ObfYL0Q3V9eOM8Neej3qRdIk68CqrxKfHDgpsAbqR_AcPJJenG7tRsqdKKVsq98Ao4H69E4KRwV4DdNLR0wnZYI8EYNcKfkcC_vXQx36uGN4ZApIZNY0Vq3ievRkfABaeaGmudgdUeseiLMbwnpwBHF9fkP7btu-k8vEo_dLA9FPR3AReAYeIGRBtsnuGiHUyHnnT3hycTKrakXKT484fkvVm4gWPsteUGNoTscvM-VQuTdGzRXmB3hnmDs0WpuE1t89G3PlmJazdxrgPbMAzUr2FwFSCpC9t4c2oWGlJ2uHlatQh5id0F5bMQiK5rEhLO-w7rJMBjhIuHRFRYrOIk5hGiaSKkKb3DA6kHZT_hcpQUWv948R2aTMnGv8kUVGZGspcUBsnR9WtKHffJ-BqYv34DeC2DnjwaZOX4Wbw8ocxxRVBlVjVK0nExcgJIuRd_GMYQ5aDR0gxyzPF7RvfVdwDimtPBITth1aH71Bg1V_9mA5uE_0Z-dWxIxJfG4FjX5pRVfeK_LdaR3Ma1UWaNo-tPj7B-wflEbVL3_q-NGMu1HDzodFzWrXad88pwCgk4YrOMof9pa',
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
