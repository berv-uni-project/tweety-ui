import Vue from 'vue';
import { PublicClientApplication } from '@azure/msal-browser';

declare module 'vue/types/vue' {
  interface Vue {
    $msalInstance: PublicClientApplication | null
  }
}