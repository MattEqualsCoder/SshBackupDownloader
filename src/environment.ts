import * as dotenv from "dotenv";
dotenv.config();

const BackupCronSchedule = process.env.BACKUP_CRON_SCHEDULE ?? '0 0 8 * * *'; // Download at 8 am every morning by default
const RemoteDirectory = process.env.REMOTE_DIRECTORY;
const LocalDirectory = process.env.LOCAL_DIRECTORY;
const SshHost = process.env.SSH_HOST;
const SshPort = process.env.SSH_PORT;
const SshUser = process.env.SSH_USER;
const SshPassword = process.env.SSH_PASSWORD;
const SshKeyPath = process.env.SSH_KEY_PATH;
const SshKeySecret = process.env.SSH_KEY_SECRET;
const MaxBackups = parseInt(process.env.MAX_BACKUPS ?? "30")

export {
    BackupCronSchedule,
    RemoteDirectory,
    LocalDirectory,
    SshHost,
    SshPort,
    SshUser,
    SshPassword,
    SshKeyPath,
    SshKeySecret,
    MaxBackups
}
