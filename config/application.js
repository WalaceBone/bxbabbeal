const WEB_SERVER_HOST = process.env.WEB_SERVER_HOST;
const WEB_SERVER_PORT = process.env.WEB_SERVER_PORT;

const SFTP_HOST = process.env.SFTP_HOST;
const SFTP_PORT = process.env.SFTP_PORT;
const SFTP_USERNAME = process.env.SFTP_USERNAME;
const SFTP_PWD = process.env.SFTP_PWD;

const CSV_ENTRY_DELIMITER = "\n";
const CSV_FIELD_DELIMITER = ",";
const CSV_HEADERS = "First Name,Last Name,Email,ZIP Code";
const EGRESS_FILE_NAME = "abbeal-";
const FOLDER_NAME = "public";
const INGRESS_FILE_NAME = "cooptation";
const INGRESS_FILE_EXT = ".csv";

export {
  CSV_ENTRY_DELIMITER,
  CSV_FIELD_DELIMITER,
  CSV_HEADERS,
  EGRESS_FILE_NAME,
  FOLDER_NAME,
  INGRESS_FILE_NAME,
  INGRESS_FILE_EXT,
  SFTP_HOST,
  SFTP_PORT,
  SFTP_USERNAME,
  SFTP_PWD,
  WEB_SERVER_HOST,
  WEB_SERVER_PORT,
};
