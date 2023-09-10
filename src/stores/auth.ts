import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

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
            }).then(response =>{
                // update pinia state
                this.user = null;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('token', response.data.token)
                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
                console.log(response.data);
            }).catch(err =>{
                console.log(err);
            })



        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});
