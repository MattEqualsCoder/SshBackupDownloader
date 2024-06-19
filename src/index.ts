import { Downloader } from "./downloader";
import { BackupCronSchedule } from "./environment";
let cron = require('node-cron');

let downloader = new Downloader();
downloader.DownloadBackups();

cron.schedule(BackupCronSchedule, () => {
    downloader.DownloadBackups();
});