import {
    contextBridge,
    ipcRenderer
} from 'electron';

console.log("in the preload...");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel : string, data : any) => {
            // whitelist channels
            let validChannels = ["select-file", "page-contents-loaded", "run-batch", "save-configuration", "get-accounts", "beta-agreement"];
            if (validChannels.includes(channel)) {
                console.log(`Sending a message to ${channel}...`);
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel : string, func : Function) => {
            let validChannels = ["file-selected-and-parsed", "configs", "payment-added-to-batch-event", "batch-failed", "batch-ok", "batch-status", "run-batch-finished", "progress-update", "configuration-saved", "accounts"];
            if (validChannels.includes(channel)) {
                console.log(`Setting up a listener on ${channel}`);
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);


