import * as dotenv from "dotenv";
dotenv.config();

const BackupCronSchedule = process.env.BACKUP_CRON_SCHEDULE ?? '0 8 * * * *';
const BackupPaths = process.env.BACKUP_PATHS?.split(",") ?? [];
const SshHost = process.env.SSH_HOST;
const SshUser = process.env.SSH_USER;
const SshPassword = process.env.SSH_PASSWORD;
const SshKeyPath = process.env.SSH_KEY_PATH;
const SshKeySecret = process.env.SSH_KEY_SECRET;

export {
    BackupCronSchedule,
    BackupPaths,
    SshHost,
    SshUser,
    SshPassword,
    SshKeyPath,
    SshKeySecret
}