interface Window {
    /** 
     * Contains electron extras supplied by our preload.ts
    */
    api: {
        // Instance of ipcRenderer (http://electronjs.org/docs/api/ipc-renderer) assigned here by preloading.
        send: any,
        receive: any
    }
}