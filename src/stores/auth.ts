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
        token: 'CfDJ8HA3hAAKLhdMolIlRN94CC-xplRrvzkSFImNm3LGmzyRugk8i33W_QzS0d_BENnht1IONC8Sn53xSeNJ_0No6IiWN5zaIwENaVvqy3BlYkyuWLvK-Pf3P0kwEj0TcLClqvQcDGV69Az-eYuz_twEhoEu4g2Nu93BzTSY7MsbYN-CAmiSwGcGXEFCSOJhkDECeie1yogVoIYeXZ5XCwCqoKV-Db5UCzvwZLqDTsf4aMqUkcp1zI0ndagW70lkDs6-zuVIDhf2_MyeMvtuqBFe_zo6KaVp6n3pIs-leHVJ4dHfKlJNGcqJE6Nm8nyDD7tAO8addFjU8j8cit5ZhmIWYTqtaVnWtPvPPL2hZhUcilEM8Xu6ZMbc65Tk48Ug30SH9iKmWAjz12NrH1MDl3y55aMB9mabDIXLECOK2TkVrHxh__sV9C9ozfCRB_5wnBEIGGm4RnOW1IoDVK06gnqMC27NHQZPo6bv1BrjFMmIABJ5fCvY_taW5G6kXsVw6iI8rcN8XFcTbtWxVCVeXLZBzqsyiuxP6toQ2YyswjC8lp_kBZ12FvpAUw69FYgOdixf-E88E87E1naW35vqjtYW6NQtTdU3musRLpUFC8RI0f6hLQreS0_K9JaNW9yww5ySgzpUu3gw7qVKZpc25xHU9Iy6s4vSqJjeYBwEgLdqvn5QJ0rXydks_q8TTq5IEJFVKlwu7wQTkcJKf_454twlIZONInIRJ4ZUERmcnDykaVGn',
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
