<template>
    <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="../assets/images/logo.png" alt="亞馬屋羅提後花園" />
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    帳號登入
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    <a href="#" class="font-medium text-grayBlue-800 hover:text-grayBlue-500">
                        亞馬屋羅提後花園
                    </a>
                </p>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                    <div class="mb-2">
                        <label for="email-address" class="sr-only">信箱</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-grayBlue-500 sm:text-sm sm:leading-6"
                            placeholder="請輸入電子郵件" v-model="user.email" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">密碼</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-grayBlue-500 sm:text-sm sm:leading-6"
                            placeholder="請輸入密碼" v-model="user.password" />
                    </div>
                </div>

                <div class="flex gap-x-4">
                    <button type="submit"
                        class="btn group relative flex w-full justify-center bg-grayBlue-500 text-sm font-semibold text-white hover:bg-grayBlue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grayBlue-800"
                        @click.prevent="signIn(user)">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-grayBlue-300 group-hover:text-grayBlue-100" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        登入
                    </button>
                    <button type="submit"
                        class="btn group relative w-full bg-gray-600 text-sm font-semibold text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        @click.prevent="registerUser(user)">
                        註冊
                    </button>
                </div>
            </form>
            <button type="button" class="btn border w-full text-grayBlue-500 hover:bg-gray-50" @click.prevent="signInWithGoogle">
                <font-awesome-icon icon="fa-brands fa-google" class="mr-2" />註冊 | 登入
            </button>
        </div>
    </div>
</template>

<script>
import { auth } from "../stores/firebasedb.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { useStateStore } from "../stores/stateStore";
import Swal from 'sweetalert2';

export default {
    setup() {
        // TODO 使用stateStore的使用者ID寫入資料庫功能
        const stateStore = useStateStore();
        const router = useRouter();
        // 使用者資訊
        let user = {
            email: "",
            password: "",
        };
        // 使用電子信箱註冊使用者
        const registerUser = async () => {
            try {
                // 驗證資料
                if (!user.email || !user.password) {
                    throw new Error("Please fill in all fields.");
                }
                if (validateEmail(user.email) === false) {
                    throw new Error("Please enter a valid email address.");
                }
                if (ValidPassword(user.password) === false) {
                    throw new Error(
                        "Password must be at least 6 characters long."
                    );
                }
                // 創建新使用者
                const authUser = await createUserWithEmailAndPassword(
                    auth,
                    user.email,
                    user.password
                );
                console.log("註冊成功", authUser);
                Swal.fire('註冊成功');
            } catch (error) {
                console.log(error.message);
            }
            // 驗證電子郵件地址
            function validateEmail(email) {
                let isValidEmail = false;
                if (email) {
                    isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                }
                return isValidEmail;
            }

            // 驗證密碼
            function ValidPassword(password) {
                let isValidPassword = false;
                if (password) {
                    isValidPassword = password.length >= 6;
                }
                return isValidPassword;
            }
        };

        // 使用google註冊
        const signInWithGoogle = async () => {
            try {
                const provider = new GoogleAuthProvider();
                const authUser = await signInWithPopup(auth, provider);
                // 設置用戶額外資訊
                const id = authUser.user.uid;
                await router.push(`/dashboard/user/${id}`);
            } catch (error) {
                console.log(error);
            }
        };

        //登入
        function signIn(user) {
            signInWithEmailAndPassword(auth, user.email, user.password).then(
                (userCredential) => {
                    console.log(userCredential);
                    router.push({ name: "home" });
                }
            );
        }

        return {
            user,
            registerUser,
            signIn,
            signInWithGoogle,
            stateStore,
        };
    },
};
</script>
