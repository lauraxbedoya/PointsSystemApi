import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as stream from 'stream';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

type PartialDriveFile = {
  id: string;
  name: string;
};

type SearchResultResponse = {
  kind: 'drive#fileList';
  nextPageToken: string;
  incompleteSearch: boolean;
  files: PartialDriveFile[];
};

@Injectable()
export class GoogleDriveService {
  private driveClient;

  public constructor(private configService: ConfigService) {
    this.driveClient = this.createDriveClient();
  }

  createDriveClient() {
    // const client = new google.auth.OAuth2(this.configService.get('GOOGLE_DRIVE_CLIENT_ID'), this.configService.get('GOOGLE_DRIVE_CLIENT_SECRET'), this.configService.get('GOOGLE_DRIVE_REDIRECT_URI'));

    // client.setCredentials({ refresh_token: this.configService.get('GOOGLE_DRIVE_REFRESH_TOKEN') });

    // return google.drive({
    //   version: 'v3',
    //   auth: client,
    // });
    const KEYFILEPATH = path.join(__dirname, '/../points-system-370623-6768d795c897.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });
    const driveService = google.drive({ version: 'v3', auth });
    return driveService;
  }

  createFolder(folderName: string): Promise<PartialDriveFile> {
    return this.driveClient.files.create({
      resource: {
        name: 'pointsSystemPhotos',
        mimeType: 'application/vnd.google-apps.folder',
      },
      fields: 'id, name',
    });
  }

  searchFolder(folderName: string): Promise<PartialDriveFile | null> {
    return new Promise((resolve, reject) => {
      this.driveClient.files.list(
        {
          q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
          fields: 'files(id, name)',
        },
        (err, res: { data: SearchResultResponse }) => {
          if (err) {
            return reject(err);
          }

          return resolve(res.data.files ? res.data.files[0] : null);
        },
      );
    });
  }

  saveFile(file: Express.Multer.File, filename: string, folderId?: string) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    return this.driveClient.files.create({
      requestBody: {
        name: filename,
        mimeType: file.mimetype,
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
      fields: 'id'
    });
  }
}