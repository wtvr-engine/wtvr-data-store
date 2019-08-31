export default class WTVRDataStore extends HTMLElement {
    constructor(){
        super();
        if(this.hasAttribute("folder")){
            this.folder = this.getAttribute("folder");
        }
        if(this.hasAttribute("backend")){
            this.backend = this.getAttribute("backend");
        }
        this.synced = false;
    }

    async save(key,value){
        localStorage.setItem(this.getStorageKey(key),JSON.stringify(value));
        await this.syncUp();
    }
    async get(key){
        await this.syncDown();
        return JSON.parse(localStorage.getItem(this.getStorageKey(key)));
    }

    async syncUp(){
        if(navigator.onLine){
            return true;
        }
        return false;
    }
    
    async syncDown(){
        if(navigator.onLine && !this.synced){
            this.synced = true;
            return true;
        }
        return this.synced;
    }

    getStorageKey(key){
        if(this.folder){
            return `${this.folder}-${key}`;
        }
    }
}