import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrServiceService {

  constructor() { }

  encryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), 'tfg').toString();
    } catch (e) {
    }
    return 0;
  }

  decryptData(data: string | CryptoJS.lib.CipherParams) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, 'tfg');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
    }
  }
}
