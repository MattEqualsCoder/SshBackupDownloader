import * as dotenv from "dotenv";
dotenv.config();

const BackupCronSchedule = process.env.BACKUP_CRON_SCHEDULE ?? '0 0 8 * * *'; // Download at 8 am every morning by default
const RemoteDirectory = process.env.REMOTE_DIRECTORY;
const LocalDirectory = process.env.LOCAL_DIRECTORY;
const SshHost = process.env.SSH_HOST;
const SshPort = process.env.SSH_PORT;
const SshUser = process.env.SSH_USER; // User to connect to
const SshPassword = process.env.SSH_PASSWORD; // Password for the user
const SshKeyPath = process.env.SSH_KEY_PATH; // Path to the key file for connecting to ssh
const SshKeySecret = process.env.SSH_KEY_SECRET; // Secret for accessing the key file
const MaxBackups = parseInt(process.env.MAX_BACKUPS ?? "30") // Only contain 30 days of backups

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
