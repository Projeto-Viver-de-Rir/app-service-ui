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
        token: localStorage.getItem('token'),
        returnUrl: null
    }),
    actions: {
        async login(email: string, password: string) {

            axios.post('http://localhost:8000/api/v1/accounts/sign-in ',{
                email:email,
                password:password
            }).then(async response =>{
                localStorage.setItem('token', response.data.token)
                const repository = container.resolve(accountRepository)
                
                var data = await repository.getCurrentUser();
                this.user = data.account;
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
