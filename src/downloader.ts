import { RemoteDirectory, LocalDirectory, SshHost, SshUser, SshPassword, SshKeyPath, SshKeySecret, SshPort, MaxBackups} from './environment'
import { Logger } from './logger';
const Client = require('ssh2-sftp-client');
import fs from 'fs';

export class Downloader {

    constructor() {
        if (!RemoteDirectory) {
            Logger.error("No remote directory specified");
            throw "No remote directory specified";
        }

        if (!LocalDirectory) {
            Logger.error("No local directory specified");
            throw "No local directory specified";
        }
    }

    DownloadBackups() {
        let sftp = new Client();

        sftp.connect({
            host: SshHost,
            port: SshPort,
            username: SshUser,
            password: SshPassword,
            privateKey: SshKeyPath ? fs.readFileSync(SshKeyPath) : undefined,
            passphrase: SshKeySecret
        }).then(() => {
            return sftp.list(RemoteDirectory);
        }).then((data: any[]) => {
            if (data && data.length) {
                return data.sort((a, b) => b.modifyTime - a.modifyTime)[0].name;
            }
            return "";
        }).then((file: string) => {
            if (!file) {
                return undefined;
            }
            let remoteFile = `${RemoteDirectory}/${file}`;
            let localFile = `${LocalDirectory}/${file}`;

            if (!fs.existsSync(LocalDirectory ?? "")) {
                fs.mkdirSync(LocalDirectory ?? "");
            }

            if (fs.existsSync(localFile)) {
                fs.rmSync(localFile);
            }

            Logger.info(`Downloading remote file ${remoteFile} to ${localFile}`)

            return sftp.get(remoteFile, localFile);
        }).then(() => {
            Logger.info("Download complete")
            sftp.end();
            this.CleanupBackups();
        }).catch((err: any) => {
            Logger.error(`Failed to download file: ${err.message}`);
        });
    }

    CleanupBackups() {
        let backups = fs.readdirSync(LocalDirectory ?? "")
            .map(x => new Backup(x))
            .sort((a, b) => a.ModifiedTime.getTime() - b.ModifiedTime.getTime());

        let backupsToDelete = backups.length - MaxBackups;

        for (let i = 0; i < backupsToDelete; i++) {
            Logger.info(`Deleting old backup ${backups[i].Path}`);
            fs.rmSync(backups[i].Path);
        }
    }
}

class Backup
{
    constructor(file: string) {
        this.Path = `${LocalDirectory}/${file}`;
        this.ModifiedTime = fs.statSync(`${LocalDirectory}/${file}`).atime
    }

    Path: string;
    ModifiedTime: Date;
}