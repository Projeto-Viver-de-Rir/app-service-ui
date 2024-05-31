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
        token: 'CfDJ8Kuzxl2ZfkNKtw_1DN9cCRKFe62ZuIgppRpi6hdthcXCFR-95JPafFn6YvXu68kfXoc041I9u-5cjyiePF6_hMCJ7spR8iM5n2zADHXtkddAHfsVOB1lrQYYQawfyz8GykNc7hSdCVY9NG38YmnBBYJjXktRVyqp0FEe4qQd91p-dpICraWJQdmh__uEkHJfVqJdzTrYSRfeY43OKxdToS7nCuqfqzm5jnakUaMDIJf0-qcwjFvG4L55BQq151svgsWvc0md7AW5HMZsNFOmbO1FQUxqtEPtAM11MeKvVyxU9nlsGX8uVxY0eoYM7Uhp3t0J4F3379iR_4NVNpodAAzoINjeu-wfprzhSQk0kWuocb6w7NWm-f5W3IQv3XhkTT1H_A9ESW-8hDT3wSs9fj9waaW7wXMwxwFmBGi3N2A6q1abEafAC8a99_wqqK1-OPsN8vsyu9pwdtbRpE-Ibm9-B7-0pFjrG28ehxONUgfjiY6HpYdmS76Qqe5SCmLL5DVWKaeDUvaGxGR_als8gJWbTRJA9yWOd9KmUqv5R6cmId91d2qN8a25cT27HkR14l9juzrtQyXLXz4gmLs9y6O2nE0ZEbWqWpJOCRULlzaZm00PyESCM3dyvAH45U9l3sh-uatNp83VVxEhzFfzfoCB0PGTPBXBGUSP9luujOqscncQI_CM-xIRX1skiqdbw8TAXkR2CetTRIdejZmGWLmd6vHvOeHksvI3765M10LZ',
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
