import { Downloader } from "./downloader";
import { BackupCronSchedule } from "./environment";
const cron = require('node-cron');

const downloader = new Downloader();
downloader.DownloadBackups();

cron.schedule(BackupCronSchedule, () => {
    downloader.DownloadBackups();
});