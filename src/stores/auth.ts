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
        token: 'CfDJ8Kuzxl2ZfkNKtw_1DN9cCRIMc2tqoJ4BpCLJq302iIDqV303vmyW9tMxktBy33m_pkcxrYmme8LHThwhJhKuTszc4-go103b_xxf2vdUjZv6vHDsymeL5rQJ0YRkD3kLpTNE9K77O5xafDzgEJ4izTn8lLKqpmHa6zRf0LTSvVf8VGlFcJztP6Uv5pjw3Z2giSAbH-4o3H00J2_FcoHhRbEvnOS_SGZ3fWCVWeker_ZcPkL4TFQpmEE9NPeNpL1xIJuZXYePOGXq9C9I92ZYsJJ3u350Ahim5-cfbdkLPjZJYO4Il69mVQXdw-HeA535Wr8qZCCT8zrEp1z50zCxJOSrFh8yNKqOSvX8WzVD176mX8EWOoB9T6n9mGfGBFZBM7S4tKxYSJcVolpgywMW_AI2DKsy6gjZ6w_8CW6vE1HRgzuYRF2Lq1qyCybocAc9QpzvLFBkaU-0bQQM4sy7E6GB0axCfIOdRQIUIfbs2IyKDUg45j6cCDo_awJp4hAsgM0BcNhA5zkhz_z4Ud_NTNNu2zxgBa2aaEQtEFfldDCfc-zTt_lT8KuUi0JjOU6kkT8c0yi9NZZsIX5gRVtHngvNRFhE3B85cV6fIpPq5NGKsUary2GNeHTmU_OEiZFTCOffC0-WOa3-5NbQ6JETUnaw_Q8nkC_8aVyDrj0G1xWwGWCZCdCUh0YGngJEWlOcllbSXL4x0fUgEz-6WELShpRTkzIUgQAZGkDMek6GJU3S',
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
